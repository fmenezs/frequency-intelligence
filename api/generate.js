// api/generate.js — Vercel Serverless Function
// POST /api/generate → gera nota curatorial + validação de contexto via Claude

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing Anthropic API key' });
  }

  try {
    const { artist, lineup, slot, venue, tracks, bpmRange } = req.body;

    if (!lineup || !tracks || !tracks.length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = buildPrompt({ artist, lineup, slot, venue, tracks, bpmRange });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        system: `Você é o sistema de curadoria Frequency Intelligence, criado pelo DJ e mentor FMENEZS.
Você entende profundamente de warm-up, construção de energia, leitura de pista e narrativa musical eletrônica underground.
Você conhece organic house, afro house sofisticado, progressive house emocional, melodic techno, hypnotic techno e deep house.
Seja direto, técnico e curatorial. Fale como um DJ experiente, não como uma IA genérica.
Respostas sempre em português brasileiro.`,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Claude API error: ${response.status} — ${err}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    return res.status(200).json({ note: text });

  } catch (err) {
    console.error('Generate error:', err);
    return res.status(500).json({ error: err.message });
  }
}

// ── PROMPT ────────────────────────────────────────────────────────
function buildPrompt({ artist, lineup, slot, venue, tracks, bpmRange }) {
  const lineupNames = lineup.map(d => d.name).join(', ');
  const trackList = tracks
    .map((t, i) => `${i + 1}. "${t.track}" — ${t.artist} (${t.bpm} BPM · ${t.family})`)
    .join('\n');

  const slotLabels = {
    slot1: '1° Slot — Abertura (22:00–23:30)',
    slot2: '2° Slot — Warm-Up (23:30–01:00)',
    slot3: '3° Slot — Crescente (01:00–02:30)',
    slot4: '4° Slot — Ápice (02:30–04:00)',
    slot5: '5° Slot — Closing (04:00–06:00)',
  };

  return `Analise este contexto de set e forneça uma NOTA CURATORIAL TÉCNICA em 3 parágrafos curtos:

DJ: ${artist || 'não informado'}
SLOT: ${slotLabels[slot] || slot}
LINE-UP HEADLINERS: ${lineupNames}
VENUE: ${venue}
BPM RANGE DO SET: ${bpmRange}

TRACKS SELECIONADAS:
${trackList}

Forneça:
1. Um parágrafo sobre a ESTRATÉGIA DO SET — por que essas famílias sonoras fazem sentido para esse contexto específico
2. Um parágrafo sobre a CURVA ENERGÉTICA — como o BPM e a narrativa se desenvolvem nas 4 fases
3. Um parágrafo com 2-3 ALERTAS CURATORIAIS — o que evitar, o que o headliner provavelmente vai tocar, e como preservar o espaço dele

Seja técnico, específico e útil para um DJ profissional. Máximo 200 palavras no total.`;
}
