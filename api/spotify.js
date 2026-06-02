// api/spotify.js — Frequency Intelligence v8.0 — FMENEZS
// Fonte primária: playlists curadas do FMENEZS no Spotify

// IDs das playlists curadas do FMENEZS — fonte de verdade
const FMENEZS_PLAYLISTS = {
  g1: '6EalORs0wKhi2BEbiusNJn',  // House / Deep House
  g2: '2g5HLDoA0N55XFit6Urpve',  // Progressive House
  g3: '1hbNvpSB0b3IrTUHv8ofKZ',  // Indie Dance / Melodic Techno
  g4: '44jU7ySnUIO9ScBh6lXnYO',  // Techno
  g5: '4zWlcatIUzQnfh4LrBU8dE',  // Hard Techno
  g6: '2rAU9wn0P5mE1Xuu50bnS7',  // Afro House / Melodic House
  g7: '17xTx53j0NsZIcdvS2mbr3',  // Organic House
};

const HEADLINER_MAP = {
  'kerri chandler':'g1','honey dijon':'g1','mochakk':'g1','dennis cruz':'g1',
  'seth troxler':'g1','the martinez brothers':'g1','jamie jones':'g1',
  'danny tenaglia':'g1','green velvet':'g1','fouk':'g1','franck roger':'g1',
  'vintage culture':'g1','peggy gou':'g1','dj tennis':'g1','gorge':'g1',
  'hernan cattaneo':'g2','nox vahn':'g2','guy j':'g2','sasha':'g2',
  'john digweed':'g2','sam shure':'g2','hraach':'g2','nick warren':'g2',
  'tale of us':'g3','artbat':'g3','anyma':'g3','adriatique':'g3',
  'hosh':'g3','maceo plex':'g3','bicep':'g3','eric prydz':'g3',
  'anna':'g4','charlotte de witte':'g4','amelie lens':'g4','richie hawtin':'g4',
  'carl cox':'g4','adam beyer':'g4','paco osuna':'g4','marco carola':'g4',
  'surgeon':'g4','blawan':'g4','joachim spieth':'g4',
  'reinier zonneveld':'g5','i hate models':'g5','spfdj':'g5',
  'black coffee':'g6','adam port':'g6','bedouin':'g6','damian lazarus':'g6',
  'ahmed spins':'g6','blond:ish':'g6','keinemusik':'g6','rampa':'g6',
  '&me':'g6','themba':'g6','enoo napa':'g6','shimza':'g6',
  'satori':'g7','lee burridge':'g7','mauro masi':'g7','worakls':'g7',
  "n'to":'g7','monolink':'g7','bonobo':'g7','nicola cruz':'g7',
};

const SLOT_BPM = {
  slot1: { min: 107, max: 122 },
  slot2: { min: 114, max: 127 },
};

// IDs diretos para artistas com nome ambíguo
const AMBIGUOUS_IDS = {
  'sasha':   '2SHyvQHTbMoFVT5s5LkS38',
  'anna':    '3gqTLkCGKp5mFk7FuJKSSq',
  'bonobo':  '0cmWgDlu9CwTgxPhf403hb',
  'bicep':   '73A3bLnfnz5BoQjb4gNCga',
  'monolink':'2m4WFg9cExkUcXg0YvAaHp',
  'bedouin': '5bKdC6382t97Qnpvs81Rqx',
};

async function proxyImage(url, res) {
  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://open.spotify.com/',
      }
    });
    if (!r.ok) { res.status(404).end(); return; }
    const buf = await r.arrayBuffer();
    res.setHeader('Content-Type', r.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(Buffer.from(buf));
  } catch(e) { res.status(404).end(); }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.query.img) return proxyImage(decodeURIComponent(req.query.img), res);

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('X-FI-Version', '8.0');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const q = req.query;
  console.log('[FI v8.0]', JSON.stringify(q));

  try {
    const token = await getToken();
    if (q.artist)    return res.status(200).json(await searchArtist(token, q.artist));
    if (q.id)        return res.status(200).json(await fetchArtistById(token, q.id));
    if (q.search)    return res.status(200).json(await searchFree(token, q.search));
    if (q.test)      return res.status(200).json(await runTest(token, q.test));
    if (q.headliner) return res.status(200).json(await generateSet(token, q.headliner, q.slot||'slot1'));
    return res.status(200).json({ version:'8.0', status:'online' });
  } catch (err) {
    console.error('[FI] ERRO:', err.message);
    return res.status(500).json({ error: err.message, tracks: [], total: 0 });
  }
}

async function getToken() {
  const { SPOTIFY_CLIENT_ID: cid, SPOTIFY_CLIENT_SECRET: csec } = process.env;
  if (!cid || !csec) throw new Error('Missing credentials');
  const b64 = Buffer.from(`${cid}:${csec}`).toString('base64');
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization:`Basic ${b64}`, 'Content-Type':'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  if (!r.ok) throw new Error(`Token failed: ${r.status}`);
  return (await r.json()).access_token;
}

async function generateSet(token, headliner, slot) {
  const hlKey = Object.keys(HEADLINER_MAP).find(k => k === headliner.toLowerCase());
  const group = hlKey ? HEADLINER_MAP[hlKey] : 'g1';
  const bpmRange = SLOT_BPM[slot] || SLOT_BPM.slot1;
  const playlistId = FMENEZS_PLAYLISTS[group];

  console.log(`[FI] headliner="${headliner}" group=${group} playlist=${playlistId}`);

  // Busca tracks da playlist curada do FMENEZS
  const tracks = await getPlaylistTracks(token, playlistId, headliner);
  console.log(`[FI] ${tracks.length} tracks da playlist`);

  return {
    headliner, group, slot, bpmRange,
    tracks: tracks.slice(0, 12),
    total: tracks.length,
    sources: { playlist: tracks.length },
  };
}

async function getPlaylistTracks(token, playlistId, excludeArtist) {
  const allTracks = [];
  const seen = new Set();

  // Busca até 100 tracks da playlist (offset aleatório para variedade)
  // Primeiro pega o total
  const first = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=1&market=US`,
    { headers: { Authorization:`Bearer ${token}` } }
  );
  if (!first.ok) {
    console.log(`[FI] Playlist ${playlistId} error: ${first.status}`);
    return [];
  }
  const firstData = await first.json();
  const total = firstData.total || 0;
  console.log(`[FI] Playlist tem ${total} tracks`);

  // Escolhe offset aleatório para variedade a cada geração
  const maxOffset = Math.max(0, total - 50);
  const offset = Math.floor(Math.random() * maxOffset);

  const r = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50&offset=${offset}&market=US`,
    { headers: { Authorization:`Bearer ${token}` } }
  );
  if (!r.ok) {
    console.log(`[FI] Playlist tracks error: ${r.status}`);
    return [];
  }
  const d = await r.json();
  const items = d.items || [];
  console.log(`[FI] Fetched ${items.length} tracks (offset ${offset})`);

  for (const item of items) {
    const t = item?.track;
    if (!t?.id || t.is_local) continue;

    // Exclui o próprio headliner
    const artists = (t.artists||[]).map(a => a.name.toLowerCase());
    if (artists.some(a => a.includes(excludeArtist.toLowerCase()))) continue;

    const key = `${t.name}|||${artists[0]}`;
    if (seen.has(key)) continue;
    seen.add(key);

    allTracks.push({
      id: t.id,
      name: t.name,
      artist: (t.artists||[]).map(a => a.name).join(', '),
      album: t.album?.name || '',
      bpm: null,
      key: null,
      duration: formatDuration(t.duration_ms),
      releaseDate: t.album?.release_date || '',
      previewUrl: t.preview_url || '',
      spotifyUrl: t.external_urls?.spotify || '',
      image: t.album?.images?.[1]?.url || t.album?.images?.[0]?.url || '',
      source: 'fmenezs_playlist',
    });
  }

  // Embaralha para não retornar sempre as mesmas
  return shuffle(allTracks);
}

async function runTest(token, group) {
  const grp = FMENEZS_PLAYLISTS[group] ? group : 'g6';
  const playlistId = FMENEZS_PLAYLISTS[grp];
  const result = { version:'8.0', group:grp, playlistId };

  try {
    const r = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=5&market=US`,
      { headers: { Authorization:`Bearer ${token}` } }
    );
    result.status = r.status;
    if (r.ok) {
      const d = await r.json();
      result.total = d.total;
      result.sampleTracks = (d.items||[]).slice(0,3).map(i => ({
        name: i.track?.name,
        artist: i.track?.artists?.[0]?.name,
        hasPreview: !!i.track?.preview_url,
        spotifyUrl: !!i.track?.external_urls?.spotify,
      }));
    } else {
      result.error = await r.text();
    }
  } catch(e) { result.error = e.message; }

  return result;
}

async function searchArtist(token, name) {
  const directId = AMBIGUOUS_IDS[name.toLowerCase()];
  if (directId) {
    try {
      const r = await fetch(`https://api.spotify.com/v1/artists/${directId}`,
        { headers: { Authorization:`Bearer ${token}` } });
      if (r.ok) {
        const a = await r.json();
        return { ...formatArtist(a), group: detectGroup(name) };
      }
    } catch(e) {}
  }

  const ELEC = ['electronic','house','techno','organic','afro','deep','minimal','ambient','progressive'];
  const queries = [`${name} genre:electronic`, `${name} genre:house`, `${name} genre:techno`, name];

  for (const q of queries) {
    try {
      const r = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=artist&limit=5`,
        { headers: { Authorization:`Bearer ${token}` } }
      );
      if (!r.ok) continue;
      const d = await r.json();
      const artists = d.artists?.items || [];
      const elec = artists.find(a => (a.genres||[]).some(g => ELEC.some(eg => g.toLowerCase().includes(eg))));
      const pick = elec || (q === name ? artists[0] : null);
      if (pick) return { ...formatArtist(pick), group: detectGroup(name) };
    } catch(e) {}
  }
  return { name, photo: '', group: detectGroup(name) };
}

async function fetchArtistById(token, id) {
  const r = await fetch(`https://api.spotify.com/v1/artists/${id}`,
    { headers: { Authorization:`Bearer ${token}` } });
  if (!r.ok) throw new Error(`Artist fetch failed: ${r.status}`);
  const a = await r.json();
  return { ...formatArtist(a), group: detectGroup(a.name) };
}

async function searchFree(token, query) {
  const r = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=8`,
    { headers: { Authorization:`Bearer ${token}` } }
  );
  if (!r.ok) throw new Error(`Search failed: ${r.status}`);
  const d = await r.json();
  return { results: (d.artists?.items||[]).map(a => ({ ...formatArtist(a), group: detectGroup(a.name) })) };
}

function formatArtist(a) {
  return {
    id: a.id, name: a.name,
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

function formatDuration(ms) {
  if (!ms) return '';
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
