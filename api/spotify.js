// api/spotify.js — Frequency Intelligence / FMENEZS
// Vercel Serverless Function
//
// GET /api/spotify                              → access_token
// GET /api/spotify?artist=NAME                  → foto + grupo
// GET /api/spotify?id=SPOTIFY_ID                → foto + grupo pelo ID
// GET /api/spotify?headliner=NAME&slot=slot2    → tracks novas compatíveis
// GET /api/spotify?newTracks=GROUP&slot=slot2   → tracks novas por grupo
// GET /api/spotify?search=QUERY                 → busca livre de artistas

// ─────────────────────────────────────────────────────────────────
// MAPA: GRUPO → GRAVADORAS
// Extraído das 221 tracks + DJs curados pelo FMENEZS
// Estas são as gravadoras cujo DNA sonoro já foi aprovado
// ─────────────────────────────────────────────────────────────────
const LABEL_GROUPS = {

  g2: [ // AFRO / ORGANIC / PROGRESSIVE
    'Sounds Of Sirin','All Day I Dream','Sol Selectas','Crosstown Rebels',
    'Underyourskin','Soulistic Music','MoBlack Records','The Leftovers',
    'Canvas of Sound','Innervisions','Hoomidaas','Manual Music',
    'Greyhound Recordings','LADR','Plastic City','Luz De Selva',
    'Rumena','Kairos','Purple EP','Cafe De Anatolia',
  ],

  g1: [ // TECH / HOUSE / DEEP / SOULFUL
    'Local Talk','Innervisions','Defected','Solid Grooves','Hot Creations',
    'Repopulate Mars','Toolroom','Heist Recordings','Family Grooves',
    'King Street Sounds','Seasons Limited','Real Tone Records',
    'Layabout Music','Deeperfect','Hamkke Records','New Creatures',
  ],

  g3: [ // MELODIC TECHNO / INDIE DANCE
    'Anjunadeep','Afterlife','Steyoyoke','Diynamic','Fryhide',
    'UPPERGROUND','Manual Music','17 Steps','Warung Recordings',
    'Ritter Butzke Records','Shango Records','Nept Polarisation',
    'Stellar Fountain','Cybertron Records','Euphoric Beats 026',
  ],

  g4: [ // TECHNO / MINIMAL / HYPNOTIC
    'Affin Records','Chiron','Amotik','Subject Detroit','Lines Drawn',
    'Belladonna','A New Biosphere','Festina Lente','Geophone Records',
    'Steam Ritual','Loud Thoughts','Rage People','Corridor EP',
    'Fragments of Frequencies','The Cost of Living','Klangfall',
  ],
};

// Headliners → grupo + gravadoras primárias
const HEADLINER_MAP = {
  'Black Coffee':          { g:'g2', labels:['Soulistic Music','All Day I Dream','Crosstown Rebels'] },
  'Bedouin':               { g:'g2', labels:['All Day I Dream','Crosstown Rebels','Sounds Of Sirin'] },
  'Lee Burridge':          { g:'g2', labels:['All Day I Dream','Sol Selectas','Sounds Of Sirin'] },
  'BLOND:ISH':             { g:'g2', labels:['All Day I Dream','Sounds Of Sirin','Hoomidaas'] },
  'Damian Lazarus':        { g:'g2', labels:['Crosstown Rebels','All Day I Dream','Sol Selectas'] },
  'Satori':                { g:'g2', labels:['Sol Selectas','Crosstown Rebels','Sounds Of Sirin'] },
  'Ahmed Spins':           { g:'g2', labels:['MoBlack Records','All Day I Dream','Sounds Of Sirin'] },
  'Hernán Cattáneo':       { g:'g2', labels:['Hoomidaas','Manual Music','Greyhound Recordings'] },
  'Guy J':                 { g:'g2', labels:['Hoomidaas','Manual Music','Innervisions'] },
  'Sasha':                 { g:'g2', labels:['Hoomidaas','Manual Music','Last Night on Earth'] },
  'John Digweed':          { g:'g2', labels:['Hoomidaas','Manual Music','Bedrock Records'] },
  'FMENEZS':               { g:'g2', labels:['LADR','Hoomidaas','Sounds Of Sirin'] },
  'Keinemusik':            { g:'g2', labels:['Innervisions','All Day I Dream','Crosstown Rebels'] },
  'Rampa':                 { g:'g2', labels:['Innervisions','Crosstown Rebels','All Day I Dream'] },
  'Adam Port':             { g:'g2', labels:['Innervisions','Manual Music','Crosstown Rebels'] },
  '&ME':                   { g:'g2', labels:['Innervisions','Manual Music','Crosstown Rebels'] },
  'Kerri Chandler':        { g:'g1', labels:['Innervisions','Local Talk','MadTech'] },
  'Honey Dijon':           { g:'g1', labels:['Innervisions','Local Talk','Defected'] },
  'Mochakk':               { g:'g1', labels:['Defected','Repopulate Mars','Hot Creations'] },
  'Dennis Cruz':           { g:'g1', labels:['Solid Grooves','Hot Creations','Crosstown Rebels'] },
  'Seth Troxler':          { g:'g1', labels:['Innervisions','Local Talk','Manual Music'] },
  'Green Velvet':          { g:'g1', labels:['Solid Grooves','Hot Creations','Repopulate Mars'] },
  'The Martinez Brothers': { g:'g1', labels:['Hot Creations','Solid Grooves','Crosstown Rebels'] },
  'Vintage Culture':       { g:'g1', labels:['Anjunadeep','Manual Music','Innervisions'] },
  'Peggy Gou':             { g:'g1', labels:['Innervisions','Local Talk','Gudu Records'] },
  'Jamie Jones':           { g:'g1', labels:['Hot Creations','Crosstown Rebels','Solid Grooves'] },
  'Tale Of Us':            { g:'g3', labels:['Afterlife','Anjunadeep','Steyoyoke'] },
  'ARTBAT':                { g:'g3', labels:['Afterlife','Diynamic','UPPERGROUND'] },
  'Anyma':                 { g:'g3', labels:['Afterlife','Anjunadeep','Diynamic'] },
  'Adriatique':            { g:'g3', labels:['Afterlife','Diynamic','Steyoyoke'] },
  'HOSH':                  { g:'g3', labels:['Diynamic','Fryhide','Anjunadeep'] },
  'Maceo Plex':            { g:'g3', labels:['Anjunadeep','Steyoyoke','Affin Records'] },
  'Mita Gami':             { g:'g3', labels:['Anjunadeep','Steyoyoke','Diynamic'] },
  'Eric Prydz':            { g:'g3', labels:['Anjunadeep','Steyoyoke','Diynamic'] },
  'ANNA':                  { g:'g4', labels:['Affin Records','Chiron','Amotik'] },
  'Richie Hawtin':         { g:'g4', labels:['Affin Records','Amotik','M-nus'] },
  'Charlotte de Witte':    { g:'g4', labels:['Affin Records','Chiron','KNTXT'] },
  'Amelie Lens':           { g:'g4', labels:['Affin Records','Chiron','EXHALE Records'] },
  'Carl Cox':              { g:'g4', labels:['Affin Records','Amotik','Subject Detroit'] },
  'Paco Osuna':            { g:'g4', labels:['Affin Records','Amotik','Mindshake'] },
  'Adam Beyer':            { g:'g4', labels:['Drumcode','Affin Records','Chiron'] },
};

// BPM por slot
const SLOT_BPM = {
  slot1: { min:108, max:116 },
  slot2: { min:114, max:120 },
  slot3: { min:118, max:123 },
  slot4: { min:122, max:127 },
  slot5: { min:116, max:122 },
};

// ─────────────────────────────────────────────────────────────────
// HANDLER
// ─────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { artist, id, search, newTracks, headliner, slot } = req.query;

  try {
    const token = await getToken();

    if (!artist && !id && !search && !newTracks && !headliner)
      return res.status(200).json({ access_token: token });

    if (id)         return res.status(200).json(await fetchArtistById(token, id));
    if (artist)     return res.status(200).json(await searchArtist(token, artist));
    if (search)     return res.status(200).json(await searchFree(token, search));
    if (headliner)  return res.status(200).json(await fetchNewTracksForHeadliner(token, headliner, slot || 'slot2'));
    if (newTracks)  return res.status(200).json(await fetchNewTracksByGroup(token, newTracks, slot || 'slot2'));

  } catch (err) {
    console.error('Spotify error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}

// ─────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────
async function getToken() {
  const { SPOTIFY_CLIENT_ID: cid, SPOTIFY_CLIENT_SECRET: csec } = process.env;
  if (!cid || !csec) throw new Error('Missing Spotify credentials');
  const creds = Buffer.from(`${cid}:${csec}`).toString('base64');
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Authorization': `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  if (!r.ok) throw new Error(`Token failed: ${r.status}`);
  return (await r.json()).access_token;
}

// ─────────────────────────────────────────────────────────────────
// ARTISTAS
// ─────────────────────────────────────────────────────────────────
async function fetchArtistById(token, artistId) {
  const r = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!r.ok) throw new Error(`Artist fetch failed: ${r.status}`);
  const a = await r.json();
  return { ...formatArtist(a), group: detectGroup(a.name) };
}

async function searchArtist(token, name) {
  const r = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  if (!r.ok) throw new Error(`Search failed: ${r.status}`);
  const d = await r.json();
  const a = d.artists?.items?.[0];
  if (!a) return { name, photo: '', group: detectGroup(name) };
  return { ...formatArtist(a), group: detectGroup(name) };
}

async function searchFree(token, query) {
  const r = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=8`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  if (!r.ok) throw new Error(`Free search failed: ${r.status}`);
  const d = await r.json();
  return {
    results: (d.artists?.items || []).map(a => ({ ...formatArtist(a), group: detectGroup(a.name) })),
  };
}

function formatArtist(a) {
  return {
    id: a.id,
    name: a.name,
    photo: a.images?.[0]?.url || '',
    photoSmall: a.images?.[2]?.url || a.images?.[0]?.url || '',
    genres: a.genres || [],
    followers: a.followers?.total || 0,
    popularity: a.popularity || 0,
    spotifyUrl: a.external_urls?.spotify || '',
  };
}

// ─────────────────────────────────────────────────────────────────
// ★ TRACKS NOVAS POR HEADLINER
// Lógica principal: identifica grupo → gravadoras → busca recentes
// → filtra BPM → nunca toca o que o headliner toca
// ─────────────────────────────────────────────────────────────────
async function fetchNewTracksForHeadliner(token, headlinerName, slot) {
  // Normaliza nome
  const hlKey = Object.keys(HEADLINER_MAP).find(
    k => k.toLowerCase() === headlinerName.toLowerCase()
  );
  const hlData = hlKey ? HEADLINER_MAP[hlKey] : null;
  const group  = hlData?.g || detectGroup(headlinerName) || 'g2';

  // Gravadoras: primárias do headliner + grupo
  const primaryLabels = hlData?.labels || [];
  const groupLabels   = LABEL_GROUPS[group] || [];
  const labels = [...new Set([...primaryLabels, ...groupLabels])].slice(0, 10);

  const bpmRange = SLOT_BPM[slot] || SLOT_BPM.slot2;

  const tracks = await searchRecentTracksByLabels(token, labels, bpmRange, headlinerName);

  return {
    headliner: headlinerName,
    group,
    labels: labels.slice(0, 6),
    slot,
    bpmRange,
    tracks,
    total: tracks.length,
  };
}

async function fetchNewTracksByGroup(token, group, slot) {
  const labels   = (LABEL_GROUPS[group] || LABEL_GROUPS.g2).slice(0, 8);
  const bpmRange = SLOT_BPM[slot] || SLOT_BPM.slot2;
  const tracks   = await searchRecentTracksByLabels(token, labels, bpmRange, null);
  return { group, slot, bpmRange, tracks, total: tracks.length };
}

// ─────────────────────────────────────────────────────────────────
// BUSCA TRACKS RECENTES (últimos 90 dias) por gravadoras
// ─────────────────────────────────────────────────────────────────
async function searchRecentTracksByLabels(token, labels, bpmRange, excludeArtist) {
  const allTracks = [];
  const seen = new Set();

  // Busca em paralelo
  const results = await Promise.allSettled(
    labels.slice(0, 8).map(label => searchByLabel(token, label))
  );

  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    for (const track of (result.value || [])) {
      const key = `${track.name}|${track.artists?.[0]?.name}`;
      if (seen.has(key)) continue;
      seen.add(key);

      // Nunca tocar o que o headliner toca
      if (excludeArtist) {
        const artistNames = (track.artists || []).map(a => a.name.toLowerCase());
        if (artistNames.some(n => n.includes(excludeArtist.toLowerCase()))) continue;
      }
      allTracks.push(track);
    }
  }

  // Audio features para filtrar BPM + key
  const withFeatures = await getAudioFeatures(token, allTracks.slice(0, 60));

  // Filtra por BPM do slot (±3 BPM de tolerância)
  const filtered = withFeatures.filter(t =>
    t.tempo && t.tempo >= bpmRange.min - 3 && t.tempo <= bpmRange.max + 3
  );

  // Ordena por data de release — mais recente primeiro
  filtered.sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));

  return filtered.slice(0, 20).map(t => ({
    id:          t.id,
    name:        t.name,
    artist:      (t.artists || []).map(a => a.name).join(', '),
    album:       t.album?.name || '',
    label:       t.label || '',
    bpm:         Math.round(t.tempo || 0),
    key:         formatKey(t.key, t.mode),
    duration:    formatDuration(t.duration_ms),
    releaseDate: t.releaseDate || '',
    previewUrl:  t.preview_url || '',
    spotifyUrl:  t.external_urls?.spotify || '',
    image:       t.album?.images?.[1]?.url || t.album?.images?.[0]?.url || '',
    popularity:  t.popularity || 0,
  }));
}

async function searchByLabel(token, label) {
  try {
    // Busca por label + ano atual para priorizar recentes
    const year = new Date().getFullYear();
    const q = `label:"${label}" year:${year-1}-${year}`;
    const r = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=20&market=BR`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    if (!r.ok) return [];
    const d = await r.json();
    return (d.tracks?.items || []).map(t => ({
      ...t,
      label,
      releaseDate: t.album?.release_date || '',
    }));
  } catch(e) {
    return [];
  }
}

async function getAudioFeatures(token, tracks) {
  if (!tracks.length) return [];
  try {
    const ids = tracks.map(t => t.id).filter(Boolean).join(',');
    const r = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${ids}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    if (!r.ok) return tracks.map(t => ({ ...t, tempo: 0 }));
    const d = await r.json();
    const featMap = {};
    (d.audio_features || []).forEach(f => { if (f) featMap[f.id] = f; });
    return tracks.map(t => ({ ...t, ...(featMap[t.id] || { tempo: 0, key: -1, mode: 1 }) }));
  } catch(e) {
    return tracks.map(t => ({ ...t, tempo: 0 }));
  }
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function detectGroup(name) {
  if (!name) return 'g1';
  const n = name.toLowerCase();
  const G2 = ['black coffee','bedouin','lee burridge','blond:ish','damian lazarus',
               'satori','ahmed spins','hernán cattáneo','guy j','sasha','john digweed',
               'fmenezs','keinemusik','rampa','adam port','&me'];
  const G3 = ['tale of us','artbat','anyma','adriatique','hosh','maceo plex',
               'mita gami','trentemøller','xinobi','eric prydz','axwell'];
  const G4 = ['anna','richie hawtin','charlotte de witte','amelie lens','carl cox',
               'paco osuna','adam beyer','stef mendesidis'];
  if (G2.some(d => n.includes(d))) return 'g2';
  if (G3.some(d => n.includes(d))) return 'g3';
  if (G4.some(d => n.includes(d))) return 'g4';
  return 'g1';
}

function formatKey(key, mode) {
  const KEYS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  if (key == null || key < 0 || key > 11) return '?';
  return `${KEYS[key]} ${mode === 1 ? 'maj' : 'min'}`;
}

function formatDuration(ms) {
  if (!ms) return '';
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2,'0')}`;
}
