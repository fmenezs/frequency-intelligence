// api/generate.js — Frequency Intelligence / FMENEZS
// POST /api/generate → nota curatorial única via Claude

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing API key' });

  try {
    const { artist, lineup, slot, venue, bpmRange, group, tracks } = req.body;
    if (!lineup || !tracks?.length) return res.status(400).json({ error: 'Missing fields' });

    // Gera seed aleatória para forçar variação
    const seed = Math.floor(Math.random() * 1000);
    const prompt = buildPrompt({ artist, lineup, slot, venue, bpmRange, group, tracks, seed });

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: `Você é um curador musical especializado em warm-up de música eletrônica underground.
Conhece profundamente: organic house, afro house, progressive house, melodic techno, techno e deep house.
Você é o sistema Frequency Intelligence — fala como um DJ experiente, direto, sem clichês.
Nunca use as frases: "ao mesmo tempo", "num primeiro momento", "isso garante", "perfeito", "excelente".
Cada resposta deve ser única — use ângulos diferentes, referências específicas das tracks apresentadas.
Responda sempre em português brasileiro. Máximo 3 frases curtas.`,
        messages: [{ role: 'user', content: prompt }],
        temperature: 1.0,
      }),
    });

    if (!r.ok) throw new Error(`Claude API: ${r.status}`);
    const d = await r.json();
    return res.status(200).json({ note: d.content?.[0]?.text || '' });

  } catch (err) {
    console.error('Generate error:', err);
    return res.status(500).json({ error: err.message });
  }
}

function buildPrompt({ artist, lineup, slot, venue, bpmRange, group, tracks, seed }) {
  const lineupNames = lineup.map(d => d.name).join(', ');
  const slotLabels = {
    slot1: '1° slot (abertura)',
    slot2: '2° slot (warm-up)',
    slot3: '3° slot (crescente)',
    slot4: '4° slot (ápice)',
    slot5: '5° slot (closing)',
  };
  const venueLabels = {
    club: 'club/indoor',
    festival: 'festival/open air',
    pool: 'pool party',
    after: 'after-hours',
  };

  // Seleciona 3-4 tracks para mencionar na nota (variedade)
  const shuffled = [...tracks].sort(() => Math.random() - 0.5).slice(0, 3);
  const trackMentions = shuffled.map(t => `"${t.track || t.name}" (${t.artist || t.a})`).join(', ');

  // Ângulos diferentes baseados no seed
  const angles = [
    `Comente sobre a progressão de BPM (${bpmRange}) e como ela prepara a pista para ${lineupNames}.`,
    `Destaque o que ${lineupNames} provavelmente vai tocar e por que essas tracks criam o espaço certo antes disso.`,
    `Fale sobre a coerência de grupo sonoro (${group}) e por que essas escolhas funcionam nesse contexto específico.`,
    `Analise a escolha de abertura dessas tracks para um ${venueLabels[venue] || venue} antes de ${lineupNames}.`,
    `Destaque uma ou duas das tracks (${trackMentions}) e explique o que elas fazem narrativamente no set.`,
    `Aponte o equilíbrio entre BPM e energia emocional dessas tracks para o contexto de ${slotLabels[slot] || slot}.`,
  ];

  const angle = angles[seed % angles.length];

  return `Contexto:
DJ: ${artist || 'não informado'}
Slot: ${slotLabels[slot] || slot}
Venue: ${venueLabels[venue] || venue}
Headliners: ${lineupNames}
Grupo sonoro: ${group}
BPM range: ${bpmRange}
Tracks selecionadas: ${trackMentions}

Ângulo desta nota: ${angle}

Escreva a nota curatorial agora. Direto, específico, sem introdução.`;
}
