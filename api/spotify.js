// api/spotify.js — Frequency Intelligence / FMENEZS
// Vercel Serverless Function

// ── PLAYLISTS DE WARM-UP POR GRUPO ───────────────────────────────
// Buscas otimizadas no Spotify por grupo sonoro
const GROUP_SEARCH_QUERIES = {
  g1: [
    'warm up tech house',
    'deep house warm up set',
    'house music warm up underground',
    'deep tech house playlist',
    'soulful deep house underground',
  ],
  g2: [
    'progressive house warm up',
    'progressive house underground playlist',
    'melodic progressive house set',
    'progressive house deep',
  ],
  g3: [
    'melodic techno warm up',
    'indie dance melodic techno playlist',
    'afterlife melodic techno warm',
    'melodic techno underground',
  ],
  g4: [
    'techno raw warm up',
    'peak time techno playlist',
    'dark techno underground warm up',
    'industrial techno playlist',
  ],
  g5: [
    'hard techno warm up',
    'hard techno underground playlist',
  ],
  g6: [
    'afro house warm up',
    'afro house melodic playlist underground',
    'afro house deep soulful',
    'keinemusik afro house playlist',
  ],
  g7: [
    'organic house warm up',
    'organic house deep playlist',
    'organic house all day i dream',
    'organic house ethno deep',
  ],
};

// Artistas por grupo com IDs verificados (para busca de releases)
const GROUP_ARTISTS = {
  g1: [
    { name: 'Kerri Chandler',        id: '51tYDGpHPVBSmVjirw3lFy' },
    { name: 'Honey Dijon',           id: '3yGSRjp9aYZeWuLKJSmGgV' },
    { name: 'Mochakk',               id: '7dqFBBfQMGQdXaREVHj1i8' },
    { name: 'Dennis Cruz',           id: '4KBFIJUrMjOBBFkJbWxalx' },
    { name: 'Seth Troxler',          id: '6yOXrJMd4TxvDUFpFu8PmS' },
    { name: 'The Martinez Brothers', id: '41Q0HrwWBtuUkJc9CfWFkF' },
    { name: 'Jamie Jones',           id: '3Jv8mZcJ8f9p1Y2e4IvpzD' },
    { name: 'Fouk',                  id: '4JT6E8pevxBqWvjfPj3WlR' },
    { name: 'Franck Roger',          id: '4GiTTZgz5IFbPuHlSYxwMi' },
  ],
  g2: [
    { name: 'Hernán Cattáneo', id: '4k1O3e7MMAm2V6xqQcFGKj' },
    { name: 'Nox Vahn',        id: '2bqGPuC8kDCTLWieGOyWxu' },
    { name: 'Guy J',           id: '0Dl8j8IPLZ0EGRBizZfDdl' },
    { name: 'Sasha',           id: '2SHyvQHTbMoFVT5s5LkS38' },
    { name: 'Sam Shure',       id: '51YmUpitluHsvMTXJ2rsiN' },
    { name: 'Hraach',          id: '6rdTxNwQhUJTodUx7voWXO' },
  ],
  g3: [
    { name: 'Tale Of Us',   id: '0F4iAEMFdSGR5qFOGk2Bvg' },
    { name: 'ARTBAT',       id: '3zy26r3t4BOlwBGbFxmYlG' },
    { name: 'Anyma',        id: '0bjTNsHtWFGVoZ8yvv1y7k' },
    { name: 'Adriatique',   id: '7aS8K2M1qBMlPEeTmImEYF' },
    { name: 'HOSH',         id: '2EDImBgFnLFQRe9vkfV79h' },
    { name: 'Maceo Plex',   id: '7JWvBVnGEX6pHw4grQ3cJI' },
    { name: 'Mita Gami',    id: '5CyYLptaEKYxEYfLRpCwYI' },
    { name: 'Trentemøller', id: '7Kf4KU6xDXAw4pxvJJ5Bx6' },
  ],
  g4: [
    { name: 'Joachim Spieth',     id: '1PKtSAYVgTMH2rEGMPLTOO' },
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
    { name: 'Mauro Masi',     id: '4DB7roKjBDAuccMLQrzXX9' },
    { name: 'Sam Shure',      id: '51YmUpitluHsvMTXJ2rsiN' },
    { name: 'Hraach',         id: '6rdTxNwQhUJTodUx7voWXO' },
    { name: 'Bedouin',        id: '5bKdC6382t97Qnpvs81Rqx' },
    { name: 'Satori',         id: '5nri3hyKmKBGAfvjBi0mK0' },
    { name: 'Ahmed Spins',    id: '4jercY4pUhY6jB8eQjpVJV' },
    { name: 'Lee Burridge',   id: '1RNm0r3ViSTQNIFCMUhM7a' },
    { name: 'Damian Lazarus', id: '7rPVEECPRcpxP4XS1fkHgP' },
  ],
};

const HEADLINER_MAP = {
  'Kerri Chandler':'g1','Honey Dijon':'g1','Mochakk':'g1','Dennis Cruz':'g1',
  'Seth Troxler':'g1','The Martinez Brothers':'g1','Jamie Jones':'g1',
  'Danny Tenaglia':'g1','Green Velvet':'g1','Fouk':'g1','Franck Roger':'g1',
  'Vintage Culture':'g1','Peggy Gou':'g1',
  'Hernán Cattáneo':'g2','Nox Vahn':'g2','Guy J':'g2','Sasha':'g2',
  'John Digweed':'g2','Sam Shure':'g2','Hraach':'g2',
  'Tale Of Us':'g3','ARTBAT':'g3','Anyma':'g3','Adriatique':'g3',
  'HOSH':'g3','Maceo Plex':'g3','Mita Gami':'g3','Trentemøller':'g3',
  'Eric Prydz':'g3','Axwell':'g3',
  'ANNA':'g4','Charlotte de Witte':'g4','Amelie Lens':'g4','Richie Hawtin':'g4',
  'Carl Cox':'g4','Adam Beyer':'g4','Paco Osuna':'g4','Marco Carola':'g4',
  'Reinier Zonneveld':'g5',
  'Black Coffee':'g6','Adam Port':'g6','Bedouin':'g6','Damian Lazarus':'g6',
  'Ahmed Spins':'g6','BLOND:ISH':'g6','Keinemusik':'g6','Rampa':'g6','&ME':'g6',
  'Satori':'g7','Lee Burridge':'g7','Mauro Masi':'g7',
};

const SLOT_BPM = {
  slot1: { min: 108, max: 122 },
  slot2: { min: 114, max: 127 },
};

// ── HANDLER ───────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const q = req.query;

  try {
    const token = await getToken();

    if (!q.artist && !q.id && !q.search && !q.headliner)
      return res.status(200).json({ access_token: token });

    if (q.id)     return res.status(200).json(await fetchArtistById(token, q.id));
    if (q.artist) return res.status(200).json(await searchArtist(token, q.artist));
    if (q.search) return res.status(200).json(await searchFree(token, q.search));

    // Endpoint de teste — mostra cada etapa da busca
    if (q.test) {
      const grp = q.test;
      const queries = GROUP_SEARCH_QUERIES[grp] || GROUP_SEARCH_QUERIES.g6;
      const query = queries[0];
      console.log(`[TEST] searching playlists for: "${query}"`);

      // Testa busca de playlist
      const r1 = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=3&market=BR`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const d1 = await r1.json();
      const playlists = (d1.playlists?.items || []).filter(p=>p).slice(0,2);
      console.log(`[TEST] playlists found: ${playlists.length}`);

      if (!playlists.length) return res.status(200).json({ error: 'no playlists', query, status: r1.status });

      // Testa pegar tracks da primeira playlist
      const pl = playlists[0];
      const r2 = await fetch(
        `https://api.spotify.com/v1/playlists/${pl.id}/tracks?limit=10&market=BR&fields=items(track(id,name,artists,preview_url))`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const d2 = await r2.json();
      const tracks = (d2.items || []).map(i=>i?.track).filter(Boolean).slice(0,5);

      // Testa audio features
      const ids = tracks.map(t=>t.id).join(',');
      let features = [];
      if (ids) {
        const r3 = await fetch(
          `https://api.spotify.com/v1/audio-features?ids=${ids}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const d3 = await r3.json();
        features = d3.audio_features || [];
      }

      return res.status(200).json({
        query,
        playlistsFound: playlists.length,
        playlistName: pl.name,
        tracksFound: tracks.length,
        sampleTracks: tracks.map((t,i) => ({
          name: t.name,
          artist: t.artists?.[0]?.name,
          bpm: Math.round(features[i]?.tempo || 0),
          hasPreview: !!t.preview_url,
        })),
      });
    }

    if (q.headliner) {
      const yearFrom = q.yearFrom ? parseInt(q.yearFrom) : null;
      const yearTo   = q.yearTo   ? parseInt(q.yearTo)   : null;
      const debug    = q.debug === 'true';
      return res.status(200).json(
        await fetchTracksForHeadliner(
          token, q.headliner, q.slot || 'slot2',
          parseInt(q.days) || 90, yearFrom, yearTo, debug
        )
      );
    }

  } catch (err) {
    console.error('Spotify error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}

// ── AUTH ──────────────────────────────────────────────────────────
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

// ── ARTISTAS ──────────────────────────────────────────────────────
async function fetchArtistById(token, id) {
  const r = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
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
  return { results: (d.artists?.items || []).map(a => ({ ...formatArtist(a), group: detectGroup(a.name) })) };
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

// ── FETCH TRACKS PARA HEADLINER ───────────────────────────────────
async function fetchTracksForHeadliner(token, headlinerName, slot, days, yearFrom, yearTo, debug=false) {
  const hlKey = Object.keys(HEADLINER_MAP).find(k => k.toLowerCase() === headlinerName.toLowerCase());
  const group = hlKey ? HEADLINER_MAP[hlKey] : detectGroup(headlinerName);
  const bpmRange = SLOT_BPM[slot] || SLOT_BPM.slot2;

  console.log(`[FI] headliner=${headlinerName} group=${group} slot=${slot} days=${days} bpm=${JSON.stringify(bpmRange)}`);

  // Estratégia dupla: playlists + artistas do grupo
  const [playlistTracks, artistTracks] = await Promise.all([
    searchPlaylistTracks(token, group, bpmRange, headlinerName, yearFrom, yearTo),
    searchArtistReleaseTracks(token, group, bpmRange, headlinerName, days, yearFrom, yearTo),
  ]);

  console.log(`[FI] playlist=${playlistTracks.length} artist=${artistTracks.length}`);

  // Merge, deduplica, ordena por relevância
  const all = [...playlistTracks, ...artistTracks];
  const seen = new Set();
  const deduped = all.filter(t => {
    const key = `${t.name}|${t.artist}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Embaralha para variedade
  deduped.sort(() => Math.random() - 0.5);

  return {
    headliner: headlinerName,
    group,
    slot,
    bpmRange,
    tracks: deduped.slice(0, 20),
    total: deduped.length,
  };
}

// ── BUSCA POR PLAYLISTS PÚBLICAS ──────────────────────────────────
async function searchPlaylistTracks(token, group, bpmRange, excludeName, yearFrom, yearTo) {
  const queries = GROUP_SEARCH_QUERIES[group] || GROUP_SEARCH_QUERIES.g6;
  // Pega 2 queries aleatórias para variedade
  const shuffled = [...queries].sort(() => Math.random() - 0.5).slice(0, 2);

  const allTracks = [];
  const seen = new Set();

  await Promise.all(shuffled.map(async (query) => {
    try {
      // Busca playlists
      const r = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=5&market=BR`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (!r.ok) return;
      const d = await r.json();
      const playlists = d.playlists?.items?.filter(p => p) || [];

      // Pega tracks de cada playlist
      await Promise.all(playlists.slice(0, 3).map(async (pl) => {
        try {
          const pr = await fetch(
            `https://api.spotify.com/v1/playlists/${pl.id}/tracks?limit=50&market=BR&fields=items(track(id,name,artists,album,duration_ms,preview_url,external_urls,popularity))`,
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
          if (!pr.ok) return;
          const pd = await pr.json();
          const items = pd.items || [];

          for (const item of items) {
            const t = item.track;
            if (!t || !t.id) continue;
            const key = `${t.name}|${t.artists?.[0]?.name}`.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);

            // Exclui headliner
            const artistNames = (t.artists || []).map(a => a.name.toLowerCase());
            if (artistNames.some(n => n.includes(excludeName.toLowerCase()))) continue;

            allTracks.push({
              id: t.id,
              name: t.name,
              artist: (t.artists || []).map(a => a.name).join(', '),
              album: t.album?.name || '',
              releaseDate: t.album?.release_date || '',
              image: t.album?.images?.[1]?.url || t.album?.images?.[0]?.url || '',
              previewUrl: t.preview_url || '',
              spotifyUrl: t.external_urls?.spotify || '',
              popularity: t.popularity || 0,
              duration: formatDuration(t.duration_ms),
              source: 'playlist',
              tempo: 0,
              key: -1,
              mode: 1,
            });
          }
        } catch(e) {}
      }));
    } catch(e) {}
  }));

  // Busca audio features para filtrar BPM
  return await filterByBpm(token, allTracks, bpmRange, yearFrom, yearTo);
}

// ── BUSCA POR ARTISTAS DO GRUPO ───────────────────────────────────
async function searchArtistReleaseTracks(token, group, bpmRange, excludeName, days, yearFrom, yearTo) {
  const artists = GROUP_ARTISTS[group] || GROUP_ARTISTS.g6;
  // Pega artistas aleatórios para variedade
  const shuffled = [...artists].sort(() => Math.random() - 0.5).slice(0, 5);

  const allTracks = [];
  const seen = new Set();

  await Promise.all(shuffled.map(async (artist) => {
    if (artist.name.toLowerCase() === excludeName.toLowerCase()) return;
    try {
      const r = await fetch(
        `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=single,album&limit=20`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (!r.ok) return;
      const d = await r.json();
      const all = d.items || [];

      let targets;
      if (yearFrom && yearTo) {
        targets = all.filter(a => {
          const y = parseInt((a.release_date || '').split('-')[0]);
          return y >= yearFrom && y <= yearTo;
        });
      } else {
        const since = new Date();
        since.setDate(since.getDate() - days);
        targets = all.filter(a => a.release_date && new Date(a.release_date) >= since);
      }

      if (!targets.length) targets = all.slice(0, 3);

      await Promise.all(targets.slice(0, 3).map(async (album) => {
        try {
          const tr = await fetch(
            `https://api.spotify.com/v1/albums/${album.id}/tracks?limit=8`,
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
          if (!tr.ok) return;
          const td = await tr.json();
          for (const t of (td.items || [])) {
            const key = `${t.name}|${t.artists?.[0]?.name}`.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);
            const artistNames = (t.artists || []).map(a => a.name.toLowerCase());
            if (artistNames.some(n => n.includes(excludeName.toLowerCase()))) continue;

            allTracks.push({
              id: t.id,
              name: t.name,
              artist: (t.artists || []).map(a => a.name).join(', '),
              album: album.name,
              releaseDate: album.release_date || '',
              image: album.images?.[1]?.url || album.images?.[0]?.url || '',
              previewUrl: t.preview_url || '',
              spotifyUrl: t.external_urls?.spotify || '',
              popularity: 0,
              duration: formatDuration(t.duration_ms),
              source: 'artist',
              tempo: 0,
              key: -1,
              mode: 1,
            });
          }
        } catch(e) {}
      }));
    } catch(e) {}
  }));

  return await filterByBpm(token, allTracks, bpmRange, yearFrom, yearTo);
}

// ── FILTER BY BPM ─────────────────────────────────────────────────
async function filterByBpm(token, tracks, bpmRange, yearFrom, yearTo) {
  if (!tracks.length) return [];

  // Aplica filtro de ano se era histórica
  let filtered = tracks;
  if (yearFrom && yearTo) {
    filtered = tracks.filter(t => {
      if (!t.releaseDate) return true; // inclui sem data
      const y = parseInt(t.releaseDate.split('-')[0]);
      return y >= yearFrom && y <= yearTo;
    });
    if (!filtered.length) filtered = tracks;
  }

  // Busca audio features em batches de 50
  const batches = [];
  for (let i = 0; i < filtered.length; i += 50) {
    batches.push(filtered.slice(i, i + 50));
  }

  const withFeatures = [];
  for (const batch of batches) {
    const ids = batch.map(t => t.id).filter(Boolean).join(',');
    if (!ids) continue;
    try {
      const r = await fetch(
        `https://api.spotify.com/v1/audio-features?ids=${ids}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (!r.ok) { withFeatures.push(...batch.map(t => ({...t, tempo:0}))); continue; }
      const d = await r.json();
      const featMap = {};
      (d.audio_features || []).forEach(f => { if (f) featMap[f.id] = f; });
      batch.forEach(t => {
        const feat = featMap[t.id];
        withFeatures.push({
          ...t,
          tempo: feat?.tempo || 0,
          key: feat?.key ?? -1,
          mode: feat?.mode ?? 1,
        });
      });
    } catch(e) {
      withFeatures.push(...batch.map(t => ({...t, tempo:0})));
    }
  }

  // Filtra por BPM — inclui tempo 0 apenas se não houver suficientes
  console.log(`[FI] filterByBpm: total=${withFeatures.length} bpm=${JSON.stringify(bpmRange)}`);
  const tempos = withFeatures.slice(0,10).map(t=>Math.round(t.tempo));
  console.log(`[FI] sample tempos: ${JSON.stringify(tempos)}`);
  const inBpm = withFeatures.filter(t => t.tempo >= bpmRange.min - 3 && t.tempo <= bpmRange.max + 3);
  console.log(`[FI] inBpm: ${inBpm.length}`);
  const result = inBpm.length >= 8 ? inBpm : [...inBpm, ...withFeatures.filter(t => t.tempo === 0).slice(0, 10 - inBpm.length)];

  return result.slice(0, 20).map(t => ({
    id: t.id,
    name: t.name,
    artist: t.artist,
    album: t.album,
    bpm: t.tempo ? Math.round(t.tempo) : null,
    key: formatKey(t.key, t.mode),
    duration: t.duration,
    releaseDate: t.releaseDate,
    previewUrl: t.previewUrl,
    spotifyUrl: t.spotifyUrl,
    image: t.image,
    popularity: t.popularity,
  }));
}

// ── HELPERS ───────────────────────────────────────────────────────
function detectGroup(name) {
  if (!name) return 'g1';
  const n = name.toLowerCase();
  if (['hernán cattáneo','nox vahn','guy j','sasha','john digweed','sam shure','hraach'].some(d => n.includes(d))) return 'g2';
  if (['tale of us','artbat','anyma','adriatique','hosh','maceo plex','mita gami','trentemøller','eric prydz'].some(d => n.includes(d))) return 'g3';
  if (['anna','richie hawtin','charlotte de witte','amelie lens','carl cox','paco osuna','adam beyer'].some(d => n.includes(d))) return 'g4';
  if (['reinier zonneveld'].some(d => n.includes(d))) return 'g5';
  if (['black coffee','adam port','bedouin','damian lazarus','ahmed spins','blond:ish','keinemusik','rampa'].some(d => n.includes(d))) return 'g6';
  if (['satori','lee burridge','mauro masi'].some(d => n.includes(d))) return 'g7';
  return 'g1';
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
