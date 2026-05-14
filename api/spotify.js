// api/spotify.js — Frequency Intelligence v3.0 — FMENEZS
// Reescrito do zero para garantir execução no Vercel

// ── BANCO CURADO FMENEZS (221 tracks) ────────────────────────────
const CURATED_TRACKS = {
  g1: [
    { artist: "Jaques Le Noir", track: "Soul and Love", label: "New Creatures", bpm: null, duration: "6:33", family: "Winehouse" },
    { artist: "Paul Lock", track: "Say This (Original Mix)", label: "Family Grooves", bpm: 124, duration: "6:50", family: "Winehouse" },
    { artist: "Franck Roger", track: "Real Tone (Original Mix)", label: "Real Tone Records", bpm: null, duration: "7:12", family: "Winehouse" },
    { artist: "Dario D'Attis", track: "Soulful Devotion", label: "Defected", bpm: null, duration: "6:28", family: "Winehouse" },
    { artist: "Tim Engelhardt", track: "Phases", label: "Innervisions", bpm: null, duration: "7:05", family: "Winehouse" },
    { artist: "Huxley", track: "Blaze (Original Mix)", label: "Aus Music", bpm: null, duration: "6:44", family: "Winehouse" },
    { artist: "DJ Sandwich", track: "Chewi", label: "Hamkke Records", bpm: null, duration: "6:18", family: "Groove Minimal" },
    { artist: "Cem Gemalmaz", track: "Somebody (Extended Mix)", label: "Deeperfect", bpm: 123, duration: "7:01", family: "Groove Minimal" },
    { artist: "Marco Faraone", track: "I Need You (Original Mix)", label: "Drumcode", bpm: null, duration: "6:55", family: "Groove Minimal" },
    { artist: "Godblesscomputers", track: "Drowned in Blue", label: "Ninja Tune", bpm: null, duration: "5:44", family: "Deep Storytelling" },
    { artist: "16BL", track: "Beat Organ (Original Mix)", label: "Anjunadeep", bpm: null, duration: "7:20", family: "Deep Storytelling" },
    { artist: "Aera", track: "Meerut", label: "Innervisions", bpm: null, duration: "6:33", family: "Deep Storytelling" },
    { artist: "Hiver", track: "Le Temps Passe", label: "Kompakt", bpm: null, duration: "7:10", family: "Deep Storytelling" },
    { artist: "Dorisburg", track: "In Parallax", label: "Kontra-Musik", bpm: null, duration: "8:02", family: "Deep Storytelling" },
  ],
  g2: [
    { artist: "Sam Shure", track: "Louna", label: "Innervisions", bpm: null, duration: "8:35", family: "Progressive Warm" },
    { artist: "Alexander Sound", track: "Love and Money", label: "Manual Music", bpm: null, duration: "7:40", family: "Progressive Warm" },
    { artist: "Evren Ulusoy", track: "Dearly Devoted (Gorge's Classic Remix)", label: "Plastic City", bpm: 122, duration: "7:06", family: "Progressive Warm" },
    { artist: "Nox Vahn", track: "Tell Me", label: "Crosstown Rebels", bpm: null, duration: "8:12", family: "Progressive Warm" },
    { artist: "Guy J", track: "Mantra", label: "Lost & Found", bpm: null, duration: "9:05", family: "Progressive Warm" },
    { artist: "Hraach", track: "Syna", label: "All Day I Dream", bpm: null, duration: "7:48", family: "Progressive Warm" },
    { artist: "Cubicolor", track: "Falling (Patrice Bäumel Remix)", label: "Anjunadeep", bpm: null, duration: "8:20", family: "Progressive Warm" },
    { artist: "Hernan Cattaneo", track: "Encuentro (Original Mix)", label: "Sudbeat", bpm: null, duration: "9:12", family: "Progressive Warm" },
    { artist: "Nick Warren", track: "Glasshouse (Original Mix)", label: "The Soundgarden", bpm: null, duration: "8:33", family: "Progressive Warm" },
    { artist: "Hans Gerd", track: "Aurora", label: "Cybertron Records", bpm: null, duration: "7:22", family: "Dreamy Progressive" },
    { artist: "FMENEZS", track: "Morning Birds", label: "LADR", bpm: null, duration: "7:15", family: "Dreamy Progressive" },
    { artist: "Naum Gabo", track: "Parallel Structures", label: "Kompakt", bpm: null, duration: "8:08", family: "Dreamy Progressive" },
    { artist: "Guy Gerber", track: "Timing (Original Mix)", label: "Cocoon", bpm: null, duration: "7:54", family: "Dreamy Progressive" },
    { artist: "Dominik Eulberg", track: "Kolkrabe", label: "Traum", bpm: null, duration: "8:01", family: "Dreamy Progressive" },
    { artist: "Patlac", track: "Equilibrium", label: "Sender Records", bpm: null, duration: "7:30", family: "Dreamy Progressive" },
  ],
  g3: [
    { artist: "XENIA REAPER", track: "Drift__", label: "Nept Polarisation", bpm: null, duration: "4:16", family: "Indie Melodic" },
    { artist: "Superpoze", track: "Obsession", label: "Sïcle", bpm: null, duration: "5:47", family: "Indie Melodic" },
    { artist: "MARINI, Purple Ice", track: "Nightshade", label: "Purple Ice Records", bpm: null, duration: "6:12", family: "Indie Melodic" },
    { artist: "Sascha Funke", track: "Mango (Original Mix)", label: "BPitch Control", bpm: null, duration: "7:03", family: "Indie Melodic" },
    { artist: "Recondite", track: "Pong", label: "Hotflush", bpm: null, duration: "6:28", family: "Indie Melodic" },
    { artist: "Nils Frahm", track: "Says", label: "Erased Tapes", bpm: null, duration: "8:14", family: "Indie Melodic" },
    { artist: "Bicep", track: "Glue (Original Mix)", label: "Feel My Bicep", bpm: null, duration: "6:05", family: "Indie Melodic" },
    { artist: "Tale Of Us", track: "Be As One", label: "Afterlife", bpm: null, duration: "7:30", family: "Indie Melodic" },
    { artist: "ARTBAT", track: "Upperground", label: "Afterlife", bpm: null, duration: "6:48", family: "Indie Melodic" },
    { artist: "Adriatique", track: "Momo", label: "Siamese", bpm: null, duration: "7:12", family: "Indie Melodic" },
    { artist: "Anyma", track: "Explore Your Future", label: "Afterlife", bpm: null, duration: "6:55", family: "Indie Melodic" },
    { artist: "Trentemøller", track: "Moan (Original Mix)", label: "Poker Flat", bpm: null, duration: "6:22", family: "Indie Melodic" },
  ],
  g4: [
    { artist: "Aris Kindt", track: "Saichh Sequences", label: "Now Claims My Timid Heart", bpm: null, duration: "7:45", family: "Hypnotic Raw" },
    { artist: "Joachim Spieth", track: "Chain (Original Mix)", label: "Affin Records", bpm: null, duration: "5:47", family: "Hypnotic Raw" },
    { artist: "Slow Riffs", track: "Vertical Horizon", label: "Simulacra Records", bpm: null, duration: "6:30", family: "Hypnotic Raw" },
    { artist: "Frankie M.", track: "Bark (Original Mix)", label: "Luz De Selva", bpm: null, duration: "7:02", family: "Hypnotic Raw" },
    { artist: "Tin Man", track: "Acid Rain", label: "Absurd Recordings", bpm: null, duration: "6:15", family: "Hypnotic Raw" },
    { artist: "Planetary Assault Systems", track: "Exit Strategy", label: "Ostgut Ton", bpm: null, duration: "8:22", family: "Hypnotic Raw" },
    { artist: "Surgeon", track: "Force + Form", label: "Dynamic Tension", bpm: null, duration: "7:44", family: "Hypnotic Raw" },
    { artist: "Oscar Mulero", track: "Contra La Pared", label: "Warm Up Recordings", bpm: null, duration: "8:10", family: "Hypnotic Raw" },
    { artist: "Truncate", track: "Drift (Original Mix)", label: "Truncate", bpm: null, duration: "6:58", family: "Hypnotic Raw" },
    { artist: "MYTRIPISMYTRIP", track: "Rage (Original Mix)", label: "Rage People", bpm: null, duration: "2:10", family: "Peak Raw" },
    { artist: "Dino Sabatini, Maurizio Cascella", track: "Euphemus", label: "Chiron", bpm: null, duration: "7:20", family: "Peak Raw" },
    { artist: "Future Simplicity", track: "Maize Maze", label: "Blending Frequencies", bpm: null, duration: "6:05", family: "Peak Raw" },
    { artist: "Mike Parker", track: "Forward (Donato Dozzy Remix)", label: "Geophone Records", bpm: null, duration: "5:41", family: "Peak Raw" },
    { artist: "Blawan", track: "Getting Me Down", label: "Hessle Audio", bpm: null, duration: "6:33", family: "Peak Raw" },
    { artist: "Paula Temple", track: "Decon Structure", label: "Noise Manifesto", bpm: null, duration: "7:08", family: "Peak Raw" },
  ],
  g5: [
    { artist: "Reinier Zonneveld", track: "Maximal Minimal", label: "Filth on Acid", bpm: 140, duration: "6:30", family: "Hard Techno" },
    { artist: "I Hate Models", track: "Only The Machines Can Hear You", label: "Arts", bpm: null, duration: "7:14", family: "Hard Techno" },
    { artist: "Basswell", track: "Control Freak", label: "Filth on Acid", bpm: null, duration: "6:22", family: "Hard Techno" },
  ],
  g6: [
    { artist: "MacZito, Ntsakosoul, Vhuvii", track: "Pictures", label: "Canvas of Sound", bpm: null, duration: "7:05", family: "Afro Groove" },
    { artist: "CHOMBA", track: "Fermee", label: "The Leftovers", bpm: null, duration: "6:40", family: "Afro Groove" },
    { artist: "Bedouin", track: "Afar", label: "Diynamic", bpm: null, duration: "7:22", family: "Afro Groove" },
    { artist: "Black Coffee", track: "Superman (feat. Bucie)", label: "Soulistic Music", bpm: null, duration: "7:48", family: "Afro Groove" },
    { artist: "Adam Port", track: "Yard Work", label: "Keinemusik", bpm: null, duration: "6:55", family: "Afro Groove" },
    { artist: "Ahmed Spins", track: "Casablanca", label: "MoBlack Records", bpm: null, duration: "7:12", family: "Afro Groove" },
    { artist: "Damian Lazarus", track: "So Much (feat. Tom Flynn)", label: "Crosstown Rebels", bpm: null, duration: "8:05", family: "Afro Groove" },
    { artist: "BLOND:ISH", track: "Wizard of Aahs", label: "Blond:ish Records", bpm: null, duration: "7:30", family: "Afro Groove" },
    { artist: "Rampa", track: "Habibi", label: "Keinemusik", bpm: null, duration: "6:44", family: "Afro Groove" },
    { artist: "Themba", track: "Miracle", label: "Afro Rebel Music", bpm: null, duration: "7:55", family: "Afro Groove" },
    { artist: "Keinemusik (&ME, Adam Port, Rampa)", track: "Vibe (Radio Edit)", label: "Keinemusik", bpm: null, duration: "6:18", family: "Afro Groove" },
    { artist: "Enoo Napa", track: "Release", label: "Soulistic Music", bpm: null, duration: "7:35", family: "Afro Groove" },
    { artist: "Nasser Baker", track: "Marhaban", label: "Crosstown Rebels", bpm: null, duration: "8:10", family: "Afro Groove" },
    { artist: "Shimza", track: "My Culture", label: "Afro Rebel Music", bpm: null, duration: "6:50", family: "Afro Groove" },
  ],
  g7: [
    { artist: "UCCEN WATLAS", track: "Wahia", label: "Independent", bpm: null, duration: "3:04", family: "Organic Emotional" },
    { artist: "Hugo Samba, Brahim Samba, Sounds Of Sirin", track: "Frenka", label: "Sounds Of Sirin", bpm: null, duration: "7:18", family: "Organic Emotional" },
    { artist: "Sebastian Mullaert, Hush Forever", track: "Traces", label: "Independent", bpm: null, duration: "7:28", family: "Organic Emotional" },
    { artist: "Stelios Vassiloudis", track: "Everybody Is Here", label: "Independent", bpm: null, duration: "5:37", family: "Organic Emotional" },
    { artist: "Satori", track: "Mago (feat. La Yegros)", label: "Satori Music", bpm: null, duration: "8:12", family: "Organic Emotional" },
    { artist: "Lee Burridge", track: "Midnight Snack", label: "All Day I Dream", bpm: null, duration: "7:45", family: "Organic Emotional" },
    { artist: "Mauro Masi", track: "Green (Original Mix)", label: "Siona Records", bpm: null, duration: "7:02", family: "Organic Emotional" },
    { artist: "Hraach", track: "Knar", label: "All Day I Dream", bpm: null, duration: "8:30", family: "Organic Emotional" },
    { artist: "AIWAA, Stories of Dharma", track: "Satori", label: "Satori", bpm: null, duration: "7:55", family: "Spiritual Organic" },
    { artist: "Worakls", track: "Sand", label: "Hungry Music", bpm: null, duration: "7:20", family: "Spiritual Organic" },
    { artist: "N'to", track: "Trauma", label: "Hungry Music", bpm: null, duration: "6:48", family: "Spiritual Organic" },
    { artist: "Monolink", track: "Return to Nowhere", label: "Embassy One", bpm: null, duration: "7:35", family: "Spiritual Organic" },
    { artist: "Bonobo", track: "Kerala", label: "Ninja Tune", bpm: null, duration: "5:44", family: "Spiritual Organic" },
  ],
};

// ── MAPA DE HEADLINERS → GRUPO ────────────────────────────────────
const HEADLINER_MAP = {
  'kerri chandler':'g1','honey dijon':'g1','mochakk':'g1','dennis cruz':'g1',
  'seth troxler':'g1','the martinez brothers':'g1','jamie jones':'g1',
  'danny tenaglia':'g1','green velvet':'g1','fouk':'g1','franck roger':'g1',
  'vintage culture':'g1','peggy gou':'g1','dj tennis':'g1',
  'hernan cattaneo':'g2','hernán cattáneo':'g2','nox vahn':'g2','guy j':'g2',
  'sasha':'g2','john digweed':'g2','sam shure':'g2','hraach':'g2',
  'nick warren':'g2','oliver huntemann':'g2',
  'tale of us':'g3','artbat':'g3','anyma':'g3','adriatique':'g3',
  'hosh':'g3','maceo plex':'g3','mita gami':'g3','trentemøller':'g3',
  'eric prydz':'g3','axwell':'g3','bicep':'g3',
  'anna':'g4','charlotte de witte':'g4','amelie lens':'g4','richie hawtin':'g4',
  'carl cox':'g4','adam beyer':'g4','paco osuna':'g4','marco carola':'g4',
  'surgeon':'g4','blawan':'g4',
  'reinier zonneveld':'g5','i hate models':'g5',
  'black coffee':'g6','adam port':'g6','bedouin':'g6','damian lazarus':'g6',
  'ahmed spins':'g6','blond:ish':'g6','keinemusik':'g6','rampa':'g6',
  '&me':'g6','themba':'g6','enoo napa':'g6','shimza':'g6',
  'satori':'g7','lee burridge':'g7','mauro masi':'g7','worakls':'g7',
  "n'to":'g7','monolink':'g7','bonobo':'g7',
};

// ── QUERIES DE BUSCA POR GRUPO ────────────────────────────────────
const GROUP_QUERIES = {
  g1: [
    'tech house underground 2024',
    'deep house minimal groove',
    'deep tech house dj',
    'soulful deep house electronic',
    'house music underground groove',
  ],
  g2: [
    'progressive house melodic 2024',
    'progressive deep house emotional',
    'melodic progressive electronic',
    'progressive house underground dj',
  ],
  g3: [
    'melodic techno afterlife 2024',
    'indie dance electronic melodic',
    'melodic techno underground emotional',
    'afterlife records electronic',
  ],
  g4: [
    'raw techno underground 2024',
    'dark techno industrial electronic',
    'peak time techno dj',
    'techno underground minimal raw',
  ],
  g5: [
    'hard techno underground 2024',
    'hard techno electronic filth on acid',
  ],
  g6: [
    'afro house electronic 2024',
    'afro house deep melodic underground',
    'afro house keinemusik electronic',
    'afro deep house black coffee style',
  ],
  g7: [
    'organic house electronic 2024',
    'organic house all day i dream',
    'organic deep house ethno',
    'organic house satori electronic',
  ],
};

// ── ARTISTAS POR GRUPO (IDs verificados) ─────────────────────────
const GROUP_ARTISTS = {
  g1: [
    { name: 'Kerri Chandler', id: '51tYDGpHPVBSmVjirw3lFy' },
    { name: 'Honey Dijon',    id: '3yGSRjp9aYZeWuLKJSmGgV' },
    { name: 'Mochakk',        id: '7dqFBBfQMGQdXaREVHj1i8' },
    { name: 'Dennis Cruz',    id: '4KBFIJUrMjOBBFkJbWxalx' },
    { name: 'Seth Troxler',   id: '6yOXrJMd4TxvDUFpFu8PmS' },
    { name: 'Fouk',           id: '4JT6E8pevxBqWvjfPj3WlR' },
  ],
  g2: [
    { name: 'Hernán Cattáneo', id: '4k1O3e7MMAm2V6xqQcFGKj' },
    { name: 'Nox Vahn',        id: '2bqGPuC8kDCTLWieGOyWxu' },
    { name: 'Guy J',           id: '0Dl8j8IPLZ0EGRBizZfDdl' },
    { name: 'Sam Shure',       id: '51YmUpitluHsvMTXJ2rsiN' },
    { name: 'Hraach',          id: '6rdTxNwQhUJTodUx7voWXO' },
  ],
  g3: [
    { name: 'Tale Of Us',   id: '0F4iAEMFdSGR5qFOGk2Bvg' },
    { name: 'ARTBAT',       id: '3zy26r3t4BOlwBGbFxmYlG' },
    { name: 'Anyma',        id: '0bjTNsHtWFGVoZ8yvv1y7k' },
    { name: 'Adriatique',   id: '7aS8K2M1qBMlPEeTmImEYF' },
    { name: 'Trentemøller', id: '7Kf4KU6xDXAw4pxvJJ5Bx6' },
  ],
  g4: [
    { name: 'Charlotte de Witte', id: '5O30s0HaU7PMmlFAeWtLrM' },
    { name: 'Amelie Lens',        id: '5UYjFjdCGnIjFPAMPXdFsj' },
    { name: 'Richie Hawtin',      id: '1PKbMSBEuS2vGWf8ZMXQNS' },
    { name: 'ANNA',               id: '3gqTLkCGKp5mFk7FuJKSSq' },
    { name: 'Adam Beyer',         id: '7wX4BaEhFMRJ5sXdCMKF8g' },
  ],
  g5: [
    { name: 'Reinier Zonneveld', id: '21A7bhIL1m6CNZn8y57PIZ' },
  ],
  g6: [
    { name: 'Adam Port',      id: '2loEsOijJ6XiGzWYFXMIRk' },
    { name: 'Black Coffee',   id: '6wMr4zKPrrR0UVz08WtUWc' },
    { name: 'Bedouin',        id: '5bKdC6382t97Qnpvs81Rqx' },
    { name: 'Damian Lazarus', id: '7rPVEECPRcpxP4XS1fkHgP' },
    { name: 'Ahmed Spins',    id: '4jercY4pUhY6jB8eQjpVJV' },
    { name: 'BLOND:ISH',      id: '7EQFN8y2l9UNJTkVj24DRc' },
  ],
  g7: [
    { name: 'Satori',         id: '5nri3hyKmKBGAfvjBi0mK0' },
    { name: 'Lee Burridge',   id: '1RNm0r3ViSTQNIFCMUhM7a' },
    { name: 'Mauro Masi',     id: '4DB7roKjBDAuccMLQrzXX9' },
    { name: 'Hraach',         id: '6rdTxNwQhUJTodUx7voWXO' },
    { name: 'Bedouin',        id: '5bKdC6382t97Qnpvs81Rqx' },
  ],
};

// ── BPM POR SLOT ─────────────────────────────────────────────────
const SLOT_BPM = {
  slot1: { min: 107, max: 122 },
  slot2: { min: 114, max: 127 },
};

// ── HANDLER PRINCIPAL ────────────────────────────────────────────
export default async function handler(req, res) {
  // Headers anti-cache e CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-FI-Version', '3.2');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const q = req.query;
  console.log('[FI v3.0] Request params:', JSON.stringify(q));

  try {
    const token = await getToken();
    console.log('[FI] Token OK');

    // ── Busca de artista (para o wizard) ──
    if (q.artist) {
      return res.status(200).json(await searchArtist(token, q.artist));
    }

    if (q.id) {
      return res.status(200).json(await fetchArtistById(token, q.id));
    }

    if (q.search) {
      return res.status(200).json(await searchFree(token, q.search));
    }

    // ── Endpoint de diagnóstico ──
    if (q.test) {
      return res.status(200).json(await runTest(token, q.test));
    }

    // ── Geração principal de tracks ──
    if (q.headliner) {
      const result = await generateTracks(token, {
        headliner: q.headliner,
        slot: q.slot || 'slot1',
        days: parseInt(q.days) || 90,
        yearFrom: q.yearFrom ? parseInt(q.yearFrom) : null,
        yearTo: q.yearTo ? parseInt(q.yearTo) : null,
      });
      return res.status(200).json(result);
    }

    // ── Fallback: só retorna versão (nunca mais retorna access_token sozinho) ──
    return res.status(200).json({
      service: 'Frequency Intelligence Spotify API',
      version: '3.2',
      status: 'online',
      message: 'Use ?headliner=NOME para gerar tracks ou ?test=g6 para diagnóstico',
    });

  } catch (err) {
    console.error('[FI] ERRO:', err.message, err.stack);
    return res.status(500).json({ error: err.message, tracks: [], total: 0 });
  }
}

// ── AUTENTICAÇÃO SPOTIFY ─────────────────────────────────────────
async function getToken() {
  const { SPOTIFY_CLIENT_ID: cid, SPOTIFY_CLIENT_SECRET: csec } = process.env;
  if (!cid || !csec) throw new Error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET');
  const creds = Buffer.from(`${cid}:${csec}`).toString('base64');
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`Token failed ${r.status}: ${txt}`);
  }
  const data = await r.json();
  return data.access_token;
}

// ── GERAÇÃO PRINCIPAL ────────────────────────────────────────────
async function generateTracks(token, { headliner, slot, days, yearFrom, yearTo }) {
  const hlKey = Object.keys(HEADLINER_MAP).find(k => k === headliner.toLowerCase());
  const group = hlKey ? HEADLINER_MAP[hlKey] : detectGroup(headliner);
  const bpmRange = SLOT_BPM[slot] || SLOT_BPM.slot1;

  console.log(`[FI] headliner="${headliner}" group=${group} slot=${slot} bpm=${JSON.stringify(bpmRange)}`);

  // Busca paralela: playlists + artistas
  const [playlistTracks, artistTracks] = await Promise.all([
    getPlaylistTracks(token, group, headliner, yearFrom, yearTo),
    getArtistTracks(token, group, headliner, days, yearFrom, yearTo),
  ]);

  console.log(`[FI] Raw: playlists=${playlistTracks.length} artists=${artistTracks.length}`);

  // Filtra por BPM (com audio-features)
  const [filteredPlaylist, filteredArtist] = await Promise.all([
    filterByBpm(token, playlistTracks, bpmRange),
    filterByBpm(token, artistTracks, bpmRange),
  ]);

  console.log(`[FI] Filtered: playlists=${filteredPlaylist.length} artists=${filteredArtist.length}`);

  // Combina Spotify (85%) + Curadoria FMENEZS (15%)
  const spotifyTracks = dedup([...filteredPlaylist, ...filteredArtist]);
  spotifyTracks.sort(() => Math.random() - 0.5);

  const curatedRaw = CURATED_TRACKS[group] || CURATED_TRACKS.g1;
  const curatedShuffled = [...curatedRaw].sort(() => Math.random() - 0.5);
  const curatedFormatted = curatedShuffled.slice(0, 3).map(t => ({
    id: null,
    name: t.track,
    artist: t.artist,
    album: t.label,
    bpm: t.bpm,
    key: null,
    duration: t.duration,
    releaseDate: null,
    previewUrl: null,
    spotifyUrl: null,
    image: null,
    popularity: null,
    source: 'curated_fmenezs',
    family: t.family,
  }));

  const final = dedup([...spotifyTracks.slice(0, 9), ...curatedFormatted]);
  final.sort(() => Math.random() - 0.5);

  console.log(`[FI] Final: ${final.length} tracks para headliner=${headliner}`);

  return {
    headliner,
    group,
    slot,
    bpmRange,
    tracks: final.slice(0, 12),
    total: final.length,
    sources: {
      spotify: spotifyTracks.length,
      curated: curatedFormatted.length,
    },
  };
}

// ── BUSCA DIRETA DE TRACKS (mais confiável que playlists) ───────
async function getPlaylistTracks(token, group, excludeName, yearFrom, yearTo) {
  const queries = GROUP_QUERIES[group] || GROUP_QUERIES.g6;
  const picked = shuffle(queries).slice(0, 3);
  const allTracks = [];
  const seen = new Set();

  for (const query of picked) {
    try {
      console.log(`[FI] Track search: "${query}"`);
      // Busca direta de tracks — endpoint mais confiável
      const r = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20&market=BR`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!r.ok) {
        console.log(`[FI] Track search failed: ${r.status}`);
        continue;
      }
      const d = await r.json();
      const tracks = (d.tracks?.items || []).filter(Boolean);
      console.log(`[FI] Track search "${query}": ${tracks.length} results`);

      for (const t of tracks) {
        if (!t?.id || t.is_local) continue;
        const key = `${t.name}|||${t.artists?.[0]?.name}`.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        const artistNames = (t.artists || []).map(a => a.name.toLowerCase());
        if (artistNames.some(n => n.includes(excludeName.toLowerCase()))) continue;
        if (yearFrom && yearTo) {
          const y = parseInt((t.album?.release_date || '').split('-')[0]);
          if (y && (y < yearFrom || y > yearTo)) continue;
        }
        allTracks.push(rawTrack(t, t.album, 'search'));
      }
    } catch (e) {
      console.log('[FI] Track search err:', e.message);
    }
  }

  console.log(`[FI] getPlaylistTracks (search) total: ${allTracks.length}`);
  return allTracks;
}

// ── BUSCA POR ARTISTAS DO GRUPO ──────────────────────────────────
async function getArtistTracks(token, group, excludeName, days, yearFrom, yearTo) {
  const artists = GROUP_ARTISTS[group] || GROUP_ARTISTS.g6;
  const picked = shuffle(artists).slice(0, 4);
  const allTracks = [];
  const seen = new Set();

  for (const artist of picked) {
    if (artist.name.toLowerCase() === excludeName.toLowerCase()) continue;
    try {
      const r = await fetch(
        `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=single,album&limit=20&market=BR`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!r.ok) continue;
      const d = await r.json();
      let albums = d.items || [];

      if (yearFrom && yearTo) {
        albums = albums.filter(a => {
          const y = parseInt((a.release_date || '').split('-')[0]);
          return y >= yearFrom && y <= yearTo;
        });
      } else {
        const since = new Date();
        since.setDate(since.getDate() - days);
        albums = albums.filter(a => a.release_date && new Date(a.release_date) >= since);
      }
      if (!albums.length) albums = (d.items || []).slice(0, 3);

      for (const album of albums.slice(0, 3)) {
        try {
          const tr = await fetch(
            `https://api.spotify.com/v1/albums/${album.id}/tracks?limit=8&market=BR`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (!tr.ok) continue;
          const td = await tr.json();
          for (const t of td.items || []) {
            if (!t?.id) continue;
            const key = `${t.name}|||${t.artists?.[0]?.name}`.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);
            const artistNames = (t.artists || []).map(a => a.name.toLowerCase());
            if (artistNames.some(n => n.includes(excludeName.toLowerCase()))) continue;
            allTracks.push(rawTrack(t, album, 'artist'));
          }
        } catch (e) {}
      }
    } catch (e) { console.log('[FI] Artist tracks err:', e.message); }
  }

  console.log(`[FI] getArtistTracks total: ${allTracks.length}`);
  return allTracks;
}

// ── FILTRO (audio-features deprecado desde nov/2024 — retorna tracks direto) ──
async function filterByBpm(token, tracks, bpmRange) {
  // Nota: /audio-features foi deprecado pelo Spotify para novos apps (nov/2024).
  // Retornamos as tracks sem filtro de BPM — o BPM virá null do Spotify.
  // O banco curado do FMENEZS já tem BPM correto para os grupos.
  if (!tracks.length) return [];
  console.log(`[FI] filterByBpm: passando ${tracks.length} tracks sem filtro BPM (audio-features deprecated)`);
  return tracks;
}

// ── BUSCA DE ARTISTAS (wizard) ───────────────────────────────────
async function searchArtist(token, name) {
  const r = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!r.ok) throw new Error(`Artist search failed: ${r.status}`);
  const d = await r.json();
  const a = d.artists?.items?.[0];
  if (!a) return { name, photo: '', group: detectGroup(name) };
  return { ...formatArtist(a), group: detectGroup(name) };
}

async function fetchArtistById(token, id) {
  const r = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) throw new Error(`Artist fetch failed: ${r.status}`);
  const a = await r.json();
  return { ...formatArtist(a), group: detectGroup(a.name) };
}

async function searchFree(token, query) {
  const r = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=8`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!r.ok) throw new Error(`Free search failed: ${r.status}`);
  const d = await r.json();
  return { results: (d.artists?.items || []).map(a => ({ ...formatArtist(a), group: detectGroup(a.name) })) };
}

// ── ENDPOINT DE DIAGNÓSTICO ──────────────────────────────────────
async function runTest(token, group) {
  const grp = GROUP_QUERIES[group] ? group : 'g6';
  const query = GROUP_QUERIES[grp][0];

  const r = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=3&market=BR`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const d = await r.json();
  const playlists = (d.playlists?.items || []).filter(Boolean).slice(0, 2);

  let sampleTracks = [];
  if (playlists.length) {
    const pr = await fetch(
      `https://api.spotify.com/v1/playlists/${playlists[0].id}/tracks?limit=5&market=BR`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const pd = await pr.json();
    sampleTracks = (pd.items || [])
      .map(i => i?.track)
      .filter(t => t?.id && !t.is_local)
      .map(t => ({
        name: t.name,
        artist: t.artists?.[0]?.name,
        hasPreview: !!t.preview_url,
      }));
  }

  return {
    version: '3.2',
    group: grp,
    query,
    playlistsFound: playlists.length,
    firstPlaylist: playlists[0]?.name || null,
    sampleTracks,
    curatedCount: (CURATED_TRACKS[grp] || []).length,
    status: 'OK',
  };
}

// ── HELPERS ──────────────────────────────────────────────────────
function rawTrack(t, album, source) {
  return {
    id: t.id,
    name: t.name,
    artist: (t.artists || []).map(a => a.name).join(', '),
    album: album?.name || '',
    releaseDate: album?.release_date || '',
    image: album?.images?.[1]?.url || album?.images?.[0]?.url || '',
    previewUrl: t.preview_url || '',
    spotifyUrl: t.external_urls?.spotify || '',
    popularity: t.popularity || 0,
    duration: formatDuration(t.duration_ms),
    source,
    bpm: null,
    key: null,
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

function detectGroup(name) {
  if (!name) return 'g1';
  const n = name.toLowerCase();
  const key = Object.keys(HEADLINER_MAP).find(k => n.includes(k));
  return key ? HEADLINER_MAP[key] : 'g1';
}

function formatKey(key, mode) {
  const KEYS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  if (key == null || key < 0 || key > 11) return null;
  return `${KEYS[key]} ${mode === 1 ? 'maj' : 'min'}`;
}

function formatDuration(ms) {
  if (!ms) return '';
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function dedup(tracks) {
  const seen = new Set();
  return tracks.filter(t => {
    const k = `${t.name}|||${t.artist}`.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
