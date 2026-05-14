// api/spotify.js — Frequency Intelligence / FMENEZS
// Vercel Serverless Function

const GROUP_ARTISTS = {
  g1: [
    { name: 'Kerri Chandler',        id: '51tYDGpHPVBSmVjirw3lFy' },
    { name: 'Honey Dijon',           id: '3yGSRjp9aYZeWuLKJSmGgV' },
    { name: 'Mochakk',               id: '7dqFBBfQMGQdXaREVHj1i8' },
    { name: 'Dennis Cruz',           id: '4KBFIJUrMjOBBFkJbWxalx' },
    { name: 'Seth Troxler',          id: '6yOXrJMd4TxvDUFpFu8PmS' },
    { name: 'The Martinez Brothers', id: '41Q0HrwWBtuUkJc9CfWFkF' },
    { name: 'Jamie Jones',           id: '3Jv8mZcJ8f9p1Y2e4IvpzD' },
    { name: 'Danny Tenaglia',        id: '66KFQSRCE44JAWjaTgHpYq' },
    { name: 'Green Velvet',          id: '3lNFl1OVzRHJJcBEWMvLBX' },
    { name: 'Fouk',                  id: '4JT6E8pevxBqWvjfPj3WlR' },
    { name: 'Franck Roger',          id: '4GiTTZgz5IFbPuHlSYxwMi' },
  ],
  g2: [
    { name: 'Hernán Cattáneo', id: '4k1O3e7MMAm2V6xqQcFGKj' },
    { name: 'Nox Vahn',        id: '2bqGPuC8kDCTLWieGOyWxu' },
    { name: 'Guy J',           id: '0Dl8j8IPLZ0EGRBizZfDdl' },
    { name: 'Sasha',           id: '2SHyvQHTbMoFVT5s5LkS38' },
    { name: 'John Digweed',    id: '22KZUGygOLPwWIf5ZqNjUy' },
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
    { name: 'Dusky',        id: '3YcBF2ZtHV0zqMcAsJfB8u' },
    { name: 'Martin Roth',  id: '4OJPXaDWfWiF1TjKPGrqDQ' },
    { name: '16BL',         id: '1FuCJwKl3MEBoQULWJPMRf' },
  ],
  g4: [
    { name: 'Joachim Spieth',     id: '1PKtSAYVgTMH2rEGMPLTOO' },
    { name: 'Amotik',             id: '5cHGiN9yImRf4IxB0EVaTK' },
    { name: 'Charlotte de Witte', id: '5O30s0HaU7PMmlFAeWtLrM' },
    { name: 'Amelie Lens',        id: '5UYjFjdCGnIjFPAMPXdFsj' },
    { name: 'Richie Hawtin',      id: '1PKbMSBEuS2vGWf8ZMXQNS' },
    { name: 'ANNA',               id: '3gqTLkCGKp5mFk7FuJKSSq' },
    { name: 'Carl Cox',           id: '3fbDiqSGJAnd0bRBpN5xWC' },
    { name: 'Adam Beyer',         id: '7wX4BaEhFMRJ5sXdCMKF8g' },
    { name: 'Dino Sabatini',      id: '3sRKnCYJRVBVfBomNXyqrA' },
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

const GROUP_NAMES = {
  g1: 'Tech House / House / Deep Tech',
  g2: 'Progressive House',
  g3: 'Melodic Techno / Indie Dance',
  g4: 'Techno Raw / Peak Time',
  g5: 'Hard Techno',
  g6: 'Afro House / Melodic House',
  g7: 'Organic House',
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
  slot1: { min: 108, max: 116 },
  slot2: { min: 114, max: 120 },
  slot3: { min: 118, max: 123 },
  slot4: { min: 122, max: 127 },
  slot5: { min: 116, max: 122 },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const q = req.query;

  try {
    const token = await getToken();

    if (!q.artist && !q.id && !q.search && !q.headliner && !q.albums && !q.debug)
      return res.status(200).json({ access_token: token });

    if (q.albums) {
      const r = await fetch(
        `https://api.spotify.com/v1/artists/${q.albums}/albums?include_groups=single,album&limit=10`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const d = await r.json();
      return res.status(200).json({
        total: d.total || 0,
        items: (d.items || []).map(a => ({ name: a.name, date: a.release_date, id: a.id })),
      });
    }

    if (q.debug) {
      const grp = q.debug;
      const artists = (GROUP_ARTISTS[grp] || GROUP_ARTISTS.g6).slice(0, 2);
      const since = new Date(); since.setDate(since.getDate() - 365);
      const out = [];
      for (const a of artists) {
        const tracks = await getArtistRecentTracks(token, a.id, since);
        const feat   = await getAudioFeatures(token, tracks.slice(0, 5));
        out.push({
          artist: a.name,
          tracksRaw: tracks.length,
          bpms: feat.map(t => ({ name: t.name, bpm: Math.round(t.tempo || 0), date: t.releaseDate })),
        });
      }
      return res.status(200).json(out);
    }

    if (q.id)        return res.status(200).json(await fetchArtistById(token, q.id));
    if (q.artist)    return res.status(200).json(await searchArtist(token, q.artist));
    if (q.search)    return res.status(200).json(await searchFree(token, q.search));
    if (q.headliner) {
      const yearFrom = q.yearFrom ? parseInt(q.yearFrom) : null;
      const yearTo   = q.yearTo   ? parseInt(q.yearTo)   : null;
      return res.status(200).json(
        await fetchNewTracksForHeadliner(token, q.headliner, q.slot || 'slot2', parseInt(q.days) || 90, yearFrom, yearTo)
      );
    }

  } catch (err) {
    console.error('Spotify error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}

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

async function fetchArtistById(token, id) {
  const r = await fetch(`https://api.spotify.com/v1/artists/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
  if (!r.ok) throw new Error(`Artist fetch failed: ${r.status}`);
  const a = await r.json();
  return { ...formatArtist(a), group: detectGroup(a.name) };
}

async function searchArtist(token, name) {
  const r = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`, { headers: { 'Authorization': `Bearer ${token}` } });
  if (!r.ok) throw new Error(`Search failed: ${r.status}`);
  const d = await r.json();
  const a = d.artists?.items?.[0];
  if (!a) return { name, photo: '', group: detectGroup(name) };
  return { ...formatArtist(a), group: detectGroup(name) };
}

async function searchFree(token, query) {
  const r = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=8`, { headers: { 'Authorization': `Bearer ${token}` } });
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

async function fetchNewTracksForHeadliner(token, headlinerName, slot, days, yearFrom=null, yearTo=null) {
  const hlKey = Object.keys(HEADLINER_MAP).find(k => k.toLowerCase() === headlinerName.toLowerCase());
  const group = hlKey ? HEADLINER_MAP[hlKey] : detectGroup(headlinerName);
  const groupArtists = (GROUP_ARTISTS[group] || GROUP_ARTISTS.g6)
    .filter(a => a.name.toLowerCase() !== headlinerName.toLowerCase())
    .slice(0, 10);

  const bpmRange  = SLOT_BPM[slot] || SLOT_BPM.slot2;
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);

  const tracks = await fetchRecentReleases(token, groupArtists, bpmRange, sinceDate, headlinerName, yearFrom, yearTo);

  return {
    headliner: headlinerName,
    group,
    groupName: GROUP_NAMES[group] || group,
    artistsSearched: groupArtists.map(a => a.name),
    slot,
    bpmRange,
    days,
    tracks,
    total: tracks.length,
  };
}

async function fetchRecentReleases(token, artists, bpmRange, sinceDate, excludeName, yearFrom=null, yearTo=null) {
  const allTracks = [];
  const seen = new Set();

  const results = await Promise.allSettled(
    artists.map(a => getArtistRecentTracks(token, a.id, sinceDate, yearFrom, yearTo))
  );

  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    for (const track of (result.value || [])) {
      const key = `${track.name}|${track.artists?.[0]?.name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (excludeName) {
        const names = (track.artists || []).map(a => a.name.toLowerCase());
        if (names.some(n => n.includes(excludeName.toLowerCase()))) continue;
      }
      allTracks.push(track);
    }
  }

  if (!allTracks.length) return [];

  const withFeatures = await getAudioFeatures(token, allTracks.slice(0, 60));

  // Filtra BPM — inclui tracks sem BPM (tempo=0) como candidatas se não houver suficientes
  const withBpm   = withFeatures.filter(t => t.tempo && t.tempo >= bpmRange.min - 5 && t.tempo <= bpmRange.max + 5);
  const noBpmData = withFeatures.filter(t => !t.tempo || t.tempo === 0);

  // Usa tracks com BPM primeiro, completa com sem BPM se necessário
  const filtered = withBpm.length >= 5 ? withBpm : [...withBpm, ...noBpmData.slice(0, 10 - withBpm.length)];

  filtered.sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));

  return filtered.slice(0, 20).map(t => ({
    id:          t.id,
    name:        t.name,
    artist:      (t.artists || []).map(a => a.name).join(', '),
    album:       t.album?.name || '',
    bpm:         t.tempo ? Math.round(t.tempo) : null,
    key:         formatKey(t.key, t.mode),
    duration:    formatDuration(t.duration_ms),
    releaseDate: t.releaseDate || '',
    previewUrl:  t.preview_url || '',
    spotifyUrl:  t.external_urls?.spotify || '',
    image:       t.album?.images?.[1]?.url || t.album?.images?.[0]?.url || '',
    popularity:  t.popularity || 0,
  }));
}

async function getArtistRecentTracks(token, artistId, sinceDate, yearFrom=null, yearTo=null) {
  try {
    const r = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single,album&limit=50`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    if (!r.ok) return [];
    const d = await r.json();
    const all = d.items || [];
    if (!all.length) return [];

    let targets;
    if (yearFrom && yearTo) {
      // Filtro por era histórica
      targets = all.filter(a => {
        if (!a.release_date) return false;
        const y = parseInt(a.release_date.split('-')[0]);
        return y >= yearFrom && y <= yearTo;
      });
    } else {
      targets = all.filter(a => a.release_date && new Date(a.release_date) >= sinceDate);
    }
    if (!targets.length) targets = all.slice(0, 5);

    const trackResults = await Promise.allSettled(
      targets.slice(0, 5).map(album => getAlbumTracks(token, album))
    );

    const tracks = [];
    for (const res of trackResults) {
      if (res.status === 'fulfilled') tracks.push(...(res.value || []));
    }
    return tracks;
  } catch(e) {
    return [];
  }
}

async function getAlbumTracks(token, album) {
  try {
    const r = await fetch(
      `https://api.spotify.com/v1/albums/${album.id}/tracks?limit=10`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    if (!r.ok) return [];
    const d = await r.json();
    return (d.items || []).map(t => ({
      ...t,
      album: { name: album.name, images: album.images },
      releaseDate: album.release_date,
    }));
  } catch(e) { return []; }
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

function detectGroup(name) {
  if (!name) return 'g1';
  const n = name.toLowerCase();
  if (['hernán cattáneo','nox vahn','guy j','sasha','john digweed','sam shure','hraach'].some(d => n.includes(d))) return 'g2';
  if (['tale of us','artbat','anyma','adriatique','hosh','maceo plex','mita gami','trentemøller','eric prydz','axwell'].some(d => n.includes(d))) return 'g3';
  if (['anna','richie hawtin','charlotte de witte','amelie lens','carl cox','paco osuna','adam beyer','joachim spieth','amotik'].some(d => n.includes(d))) return 'g4';
  if (['reinier zonneveld'].some(d => n.includes(d))) return 'g5';
  if (['black coffee','adam port','bedouin','damian lazarus','ahmed spins','blond:ish','keinemusik','rampa','&me'].some(d => n.includes(d))) return 'g6';
  if (['satori','lee burridge','mauro masi'].some(d => n.includes(d))) return 'g7';
  return 'g1';
}

function formatKey(key, mode) {
  const KEYS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  if (key == null || key < 0 || key > 11) return '?';
  return `${KEYS[key]} ${mode === 1 ? 'maj' : 'min'}`;
}

function formatDuration(ms) {
  if (!ms) return '';
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
