// api/generate.js — Frequency Intelligence v3.0 — FMENEZS
// Geração de notas curatoriais via Claude API

const GROUP_NAMES = {
  g1: 'Tech House / Deep House / House',
  g2: 'Progressive House',
  g3: 'Melodic Techno / Indie Dance',
  g4: 'Techno Raw / Peak Time',
  g5: 'Hard Techno',
  g6: 'Afro House / Melodic House',
  g7: 'Organic House',
};

// 6 ângulos curatoriais diferentes para variedade real
const CURATORIAL_ANGLES = [
  'Como curador de warm-up, analise a coerência energética e narrativa deste set.',
  'Avalie a progressão de BPM e a construção de tensão e respiro deste set.',
  'Analise a frequência estética, as famílias sonoras e a profundidade emocional destas tracks.',
  'Como DJ experiente, comente sobre o groove, a leitura de pista e o momento ideal deste set.',
  'Analise a coerência harmônica, as labels representadas e o posicionamento underground deste set.',
  'Avalie a narrativa musical, os momentos de clímax e a entrega para o headliner neste set.',
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { ANTHROPIC_API_KEY } = process.env;
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Missing ANTHROPIC_API_KEY' });

  try {
    const body = req.body;
    const {
      headliner = '',
      slot = 'slot1',
      group = 'g1',
      venue = '',
      djName = '',
      tracks = [],
      bpmRange = {},
    } = body;

    // Ângulo aleatório para variedade
    const angle = CURATORIAL_ANGLES[Math.floor(Math.random() * CURATORIAL_ANGLES.length)];
    const groupName = GROUP_NAMES[group] || group;
    const slotLabel = slot === 'slot1' ? 'Abertura (Slot 1)' : 'Warm-up Principal (Slot 2)';

    // Monta lista de tracks para o prompt
    const trackList = tracks
      .slice(0, 12)
      .map((t, i) => {
        const bpm = t.bpm ? ` | ${t.bpm} BPM` : '';
        const key = t.key ? ` | ${t.key}` : '';
        const src = t.source === 'curated_fmenezs' ? ' [CURADORIA]' : '';
        return `${i + 1}. ${t.artist} — ${t.name}${bpm}${key}${src}`;
      })
      .join('\n');

    const prompt = `Você é FMENEZS, DJ e mentor especialista em warm-up de música eletrônica underground.

CONTEXTO DO SET:
- DJ: ${djName || 'Warm-up DJ'}
- Headliner: ${headliner}
- Slot: ${slotLabel}
- Grupo Sonoro: ${groupName}
- BPM Range: ${bpmRange.min || '?'} – ${bpmRange.max || '?'} BPM
- Venue: ${venue || 'não informado'}

TRACKS SELECIONADAS:
${trackList || 'Nenhuma track informada'}

ÂNGULO CURATORIAL:
${angle}

Escreva uma nota curatorial curta (3–4 parágrafos) sobre este set de warm-up. 
Seja específico sobre as tracks, o grupo sonoro e a narrativa musical.
Use linguagem de DJ experiente — sem clichês genéricos.
Mencione tensão vs respiro, construção de energia e coerência estética.
Termine com uma frase sobre o momento de entrega para o headliner.
Responda sempre em português brasileiro.`;

    console.log('[FI generate] Sending to Claude API...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        temperature: 1.0,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Claude API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const text = data.content?.map(c => c.text || '').join('') || '';

    console.log('[FI generate] OK, chars:', text.length);

    return res.status(200).json({
      note: text,
      angle,
      group,
      headliner,
      slot,
    });

  } catch (err) {
    console.error('[FI generate] ERROR:', err.message);
    return res.status(500).json({
      error: err.message,
      note: 'Não foi possível gerar a nota curatorial. Tente novamente.',
    });
  }
}
