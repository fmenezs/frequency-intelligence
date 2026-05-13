// api/spotify.js — Frequency Intelligence / FMENEZS
// Vercel Serverless Function
//
// GET /api/spotify                              → access_token
// GET /api/spotify?artist=NAME                  → foto + grupo
// GET /api/spotify?id=SPOTIFY_ID                → foto + grupo pelo ID
// GET /api/spotify?headliner=NAME&slot=S&days=D → tracks novas compatíveis
// GET /api/spotify?search=QUERY                 → busca livre de artistas

// ─────────────────────────────────────────────────────────────────
// ARTISTAS POR GRUPO — Spotify IDs verificados
// Usados para buscar releases recentes via /artists/{id}/albums
// ─────────────────────────────────────────────────────────────────
const GROUP_ARTISTS = {

  g2: [ // AFRO / ORGANIC / PROGRESSIVE
    // Organic / World
    { name: 'Hugo Samba',         id: '4ARqFEwGPNcRFmgMEMFReq' },
    { name: 'Sebastian Mullaert', id: '1hxOSEXBFMiE5XYuHm0kLH' },
    { name: 'Nox Vahn',           id: '6XyGHsrNqBFkVGHFJmWIjq' },
    { name: 'Marsh',              id: '2yNQGBQANFJpbD9KVTBJCE' },
    { name: 'Mauro Masi',         id: '5OPbS6E1LBBo7NJEr7T3jB' },
    { name: 'D.M.P',              id: '4TpKSVwNRJHRhTGwsF7Xjf' },
    { name: 'Sam Shure',          id: '5VYe5XVnzFNpOt4KzGkDHx' },
    { name: 'Hraach',             id: '3FBK7qGXTrKqJCdqlBFyZK' },
    { name: 'Bedouin',            id: '1Ioqw10Hy5F1OIJb4cXbpY' },
    { name: 'Satori',             id: '7fIvjotigTGWqjIz6EP1i5' },
    { name: 'BLOND:ISH',          id: '7EQFN8y2l9UNJTkVj24DRc' },
    { name: 'Damian Lazarus',     id: '7rPVEECPRcpxP4XS1fkHgP' },
    { name: 'Ahmed Spins',        id: '4p9z80FZZXNJUmjlFCKxpb' },
    { name: 'Lee Burridge',       id: '1RNm0r3ViSTQNIFCMUhM7a' },
    { name: 'Hernán Cattáneo',    id: '4k1O3e7MMAm2V6xqQcFGKj' },
    { name: 'Guy J',              id: '0Dl8j8IPLZ0EGRBizZfDdl' },
    { name: 'Keinemusik',         id: '5WPNBzIqUlFLbPP1kKXmjA' },
    { name: 'Rampa',              id: '5pOHDIHsNpwYBcaFX5Zxmd' },
    { name: 'Adam Port',          id: '2RqrWplBJNqRwFGqvFzwCq' },
  ],

  g1: [ // TECH / HOUSE / DEEP / SOULFUL
    { name: 'Kerri Chandler',          id: '51tYDGpHPVBSmVjirw3lFy' },
    { name: 'Honey Dijon',             id: '3yGSRjp9aYZeWuLKJSmGgV' },
    { name: 'Mochakk',                 id: '7dqFBBfQMGQdXaREVHj1i8' },
    { name: 'Dennis Cruz',             id: '4KBFIJUrMjOBBFkJbWxalx' },
    { name: 'Seth Troxler',            id: '6yOXrJMd4TxvDUFpFu8PmS' },
    { name: 'The Martinez Brothers',   id: '41Q0HrwWBtuUkJc9CfWFkF' },
    { name: 'Jamie Jones',             id: '3Jv8mZcJ8f9p1Y2e4IvpzD' },
    { name: 'Danny Tenaglia',          id: '66KFQSRCE44JAWjaTgHpYq' },
    { name: 'Green Velvet',            id: '3lNFl1OVzRHJJcBEWMvLBX' },
    { name: 'Fouk',                    id: '4JT6E8pevxBqWvjfPj3WlR' },
    { name: 'Franck Roger',            id: '4GiTTZgz5IFbPuHlSYxwMi' },
  ],

  g3: [ // MELODIC TECHNO / INDIE DANCE
    { name: 'Tale Of Us',     id: '0F4iAEMFdSGR5qFOGk2Bvg' },
    { name: 'ARTBAT',         id: '3zy26r3t4BOlwBGbFxmYlG' },
    { name: 'Anyma',          id: '0bjTNsHtWFGVoZ8yvv1y7k' },
    { name: 'Adriatique',     id: '7aS8K2M1qBMlPEeTmImEYF' },
    { name: 'HOSH',           id: '2EDImBgFnLFQRe9vkfV79h' },
    { name: 'Maceo Plex',     id: '7JWvBVnGEX6pHw4grQ3cJI' },
    { name: 'Mita Gami',      id: '5CyYLptaEKYxEYfLRpCwYI' },
    { name: 'Trentemøller',   id: '7Kf4KU6xDXAw4pxvJJ5Bx6' },
    { name: 'Dusky',          id: '3YcBF2ZtHV0zqMcAsJfB8u' },
    { name: 'Martin Roth',    id: '4OJPXaDWfWiF1TjKPGrqDQ' },
    { name: '16BL',           id: '1FuCJwKl3MEBoQULWJPMRf' },
  ],

  g4: [ // TECHNO / MINIMAL / HYPNOTIC
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
};

// Headliners → grupo + artistas de referência do mesmo universo
const HEADLINER_MAP = {
  'Black Coffee':          { g:'g2', ref:['Bedouin','Ahmed Spins','BLOND:ISH','Satori','Damian Lazarus','Keinemusik'] },
  'Bedouin':               { g:'g2', ref:['Black Coffee','Satori','Lee Burridge','Damian Lazarus','Keinemusik'] },
  'Lee Burridge':          { g:'g2', ref:['Satori','Bedouin','BLOND:ISH','Damian Lazarus'] },
  'BLOND:ISH':             { g:'g2', ref:['Bedouin','Lee Burridge','Ahmed Spins','Satori'] },
  'Damian Lazarus':        { g:'g2', ref:['Bedouin','Satori','Lee Burridge','BLOND:ISH'] },
  'Satori':                { g:'g2', ref:['Lee Burridge','Bedouin','Damian Lazarus','Ahmed Spins'] },
  'Ahmed Spins':           { g:'g2', ref:['Black Coffee','Bedouin','BLOND:ISH','Satori'] },
  'Hernán Cattáneo':       { g:'g2', ref:['Guy J','Sasha','John Digweed','D.M.P','Sam Shure'] },
  'Guy J':                 { g:'g2', ref:['Hernán Cattáneo','Sasha','John Digweed','Hraach'] },
  'Sasha':                 { g:'g2', ref:['Guy J','Hernán Cattáneo','John Digweed'] },
  'John Digweed':          { g:'g2', ref:['Sasha','Guy J','Hernán Cattáneo'] },
  'Keinemusik':            { g:'g2', ref:['Black Coffee','Bedouin','Rampa','Adam Port'] },
  'Rampa':                 { g:'g2', ref:['Keinemusik','Adam Port','Black Coffee','Bedouin'] },
  'Adam Port':             { g:'g2', ref:['Keinemusik','Rampa','Black Coffee'] },
  'Kerri Chandler':        { g:'g1', ref:['Honey Dijon','Seth Troxler','Danny Tenaglia'] },
  'Honey Dijon':           { g:'g1', ref:['Kerri Chandler','Seth Troxler','Mochakk'] },
  'Mochakk':               { g:'g1', ref:['Dennis Cruz','Jamie Jones','The Martinez Brothers'] },
  'Dennis Cruz':           { g:'g1', ref:['Mochakk','Jamie Jones','Seth Troxler'] },
  'Seth Troxler':          { g:'g1', ref:['Kerri Chandler','Honey Dijon','Dennis Cruz'] },
  'Green Velvet':          { g:'g1', ref:['Mochakk','Dennis Cruz','Jamie Jones'] },
  'The Martinez Brothers': { g:'g1', ref:['Mochakk','Jamie Jones','Green Velvet'] },
  'Vintage Culture':       { g:'g1', ref:['Mochakk','Dennis Cruz','Peggy Gou'] },
  'Peggy Gou':             { g:'g1', ref:['Honey Dijon','Seth Troxler','Vintage Culture'] },
  'Jamie Jones':           { g:'g1', ref:['The Martinez Brothers','Dennis Cruz','Mochakk'] },
  'Tale Of Us':            { g:'g3', ref:['ARTBAT','Anyma','Adriatique','HOSH'] },
  'ARTBAT':                { g:'g3', ref:['Tale Of Us','Anyma','Adriatique'] },
  'Anyma':                 { g:'g3', ref:['Tale Of Us','ARTBAT','Adriatique'] },
  'Adriatique':            { g:'g3', ref:['Tale Of Us','HOSH','Maceo Plex','Mita Gami'] },
  'HOSH':                  { g:'g3', ref:['Adriatique','Maceo Plex','Mita Gami'] },
  'Maceo Plex':            { g:'g3', ref:['HOSH','Adriatique','Mita Gami','Trentemøller'] },
  'Eric Prydz':            { g:'g3', ref:['Tale Of Us','ARTBAT','Adriatique'] },
  'ANNA':                  { g:'g4', ref:['Charlotte de Witte','Amelie Lens','Richie Hawtin'] },
  'Charlotte de Witte':    { g:'g4', ref:['ANNA','Amelie Lens','Adam Beyer'] },
  'Amelie Lens':           { g:'g4', ref:['Charlotte de Witte','ANNA','Adam Beyer'] },
  'Carl Cox':              { g:'g4', ref:['Richie Hawtin','Adam Beyer','ANNA'] },
  'Richie Hawtin':         { g:'g4', ref:['Carl Cox','Paco Osuna','Joachim Spieth'] },
  'Adam Beyer':            { g:'g4', ref:['Charlotte de Witte','Amelie Lens','ANNA'] },
  'Paco Osuna':            { g:'g4', ref:['Richie Hawtin','Joachim Spieth','Carl Cox'] },
};

// Spotify IDs dos headliners para exclusão
const HEADLINER_SPOTIFY_IDS = {
  'Black Coffee':'6wMr4zKPrrR0UVz08WtUWc',
  'Bedouin':'1Ioqw10Hy5F1OIJb4cXbpY',
  'Lee Burridge':'1RNm0r3ViSTQNIFCMUhM7a',
  'BLOND:ISH':'7EQFN8y2l9UNJTkVj24DRc',
  'Damian Lazarus':'7rPVEECPRcpxP4XS1fkHgP',
  'Satori':'7fIvjotigTGWqjIz6EP1i5',
  'Ahmed Spins':'4p9z80FZZXNJUmjlFCKxpb',
  'Hernán Cattáneo':'4k1O3e7MMAm2V6xqQcFGKj',
  'Guy J':'0Dl8j8IPLZ0EGRBizZfDdl',
  'Sasha':'2SHyvQHTbMoFVT5s5LkS38',
  'John Digweed':'22KZUGygOLPwWIf5ZqNjUy',
  'Keinemusik':'5WPNBzIqUlFLbPP1kKXmjA',
  'Kerri Chandler':'51tYDGpHPVBSmVjirw3lFy',
  'Honey Dijon':'3yGSRjp9aYZeWuLKJSmGgV',
  'Mochakk':'7dqFBBfQMGQdXaREVHj1i8',
  'Dennis Cruz':'4KBFIJUrMjOBBFkJbWxalx',
  'Seth Troxler':'6yOXrJMd4TxvDUFpFu8PmS',
  'Green Velvet':'3lNFl1OVzRHJJcBEWMvLBX',
  'The Martinez Brothers':'41Q0HrwWBtuUkJc9CfWFkF',
  'Vintage Culture':'5BcAKTbp20cv7tC5VqPFoC',
  'Peggy Gou':'05oH07COxkXKIMt6mIPRee',
  'Jamie Jones':'3Jv8mZcJ8f9p1Y2e4IvpzD',
  'Tale Of Us':'0F4iAEMFdSGR5qFOGk2Bvg',
  'ARTBAT':'3zy26r3t4BOlwBGbFxmYlG',
  'Anyma':'0bjTNsHtWFGVoZ8yvv1y7k',
  'Adriatique':'7aS8K2M1qBMlPEeTmImEYF',
  'HOSH':'2EDImBgFnLFQRe9vkfV79h',
  'Maceo Plex':'7JWvBVnGEX6pHw4grQ3cJI',
  'Eric Prydz':'4u7Z9cqxWiCNnBaS2tBhiS',
  'ANNA':'3gqTLkCGKp5mFk7FuJKSSq',
  'Charlotte de Witte':'5O30s0HaU7PMmlFAeWtLrM',
  'Amelie Lens':'5UYjFjdCGnIjFPAMPXdFsj',
  'Carl Cox':'3fbDiqSGJAnd0bRBpN5xWC',
  'Richie Hawtin':'1PKbMSBEuS2vGWf8ZMXQNS',
  'Adam Beyer':'7wX4BaEhFMRJ5sXdCMKF8g',
  'Paco Osuna':'3MmOalERgHDf12kSLdSYRo',
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

  const { artist, id, search, headliner, slot, days } = req.query;

  try {
    const token = await getToken();

    if (!artist && !id && !search && !headliner)
      return res.status(200).json({ access_token: token });

    if (id)        return res.status(200).json(await fetchArtistById(token, id));
    if (artist)    return res.status(200).json(await searchArtist(token, artist));
    if (search)    return res.status(200).json(await searchFree(token, search));
    if (headliner) return res.status(200).json(
      await fetchNewTracksForHeadliner(token, headliner, slot || 'slot2', parseInt(days) || 90)
    );

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
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
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
    results: (d.artists?.items || []).map(a => ({
      ...formatArtist(a),
      group: detectGroup(a.name),
    })),
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
// Busca releases recentes dos artistas do mesmo grupo
// Filtra BPM pelo slot + exclui o headliner
// ─────────────────────────────────────────────────────────────────
async function fetchNewTracksForHeadliner(token, headlinerName, slot, days) {
  // Normaliza nome
  const hlKey = Object.keys(HEADLINER_MAP).find(
    k => k.toLowerCase() === headlinerName.toLowerCase()
  );
  const hlData  = hlKey ? HEADLINER_MAP[hlKey] : null;
  const group   = hlData?.g || detectGroup(headlinerName) || 'g2';
  const refNames = hlData?.ref || [];

  // Artistas do grupo para buscar releases
  const groupArtists = GROUP_ARTISTS[group] || GROUP_ARTISTS.g2;

  // Prioriza artistas de referência do headliner
  const refArtists = groupArtists.filter(a =>
    refNames.some(r => r.toLowerCase() === a.name.toLowerCase())
  );
  const otherArtists = groupArtists.filter(a =>
    !refNames.some(r => r.toLowerCase() === a.name.toLowerCase())
  );
  const artistsToSearch = [...refArtists, ...otherArtists].slice(0, 12);

  // BPM e período
  const bpmRange  = SLOT_BPM[slot] || SLOT_BPM.slot2;
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);

  // ID do headliner para exclusão
  const hlSpotifyId = HEADLINER_SPOTIFY_IDS[hlKey] || null;

  // Busca releases recentes em paralelo
  const tracks = await fetchRecentReleases(token, artistsToSearch, bpmRange, sinceDate, hlSpotifyId, headlinerName);

  return {
    headliner: headlinerName,
    group,
    refArtists: refNames.slice(0, 5),
    slot,
    bpmRange,
    days,
    tracks,
    total: tracks.length,
  };
}

// ─────────────────────────────────────────────────────────────────
// BUSCA RELEASES RECENTES dos artistas do grupo
// ─────────────────────────────────────────────────────────────────
async function fetchRecentReleases(token, artists, bpmRange, sinceDate, excludeId, excludeName) {
  const allTracks = [];
  const seen      = new Set();

  // Busca álbuns/singles recentes de cada artista
  const albumResults = await Promise.allSettled(
    artists.map(a => getArtistRecentTracks(token, a.id, sinceDate))
  );

  for (const result of albumResults) {
    if (result.status !== 'fulfilled') continue;
    for (const track of (result.value || [])) {
      const key = `${track.name}|${track.artists?.[0]?.name}`;
      if (seen.has(key)) continue;
      seen.add(key);

      // Exclui o headliner
      const artistIds   = (track.artists || []).map(a => a.id);
      const artistNames = (track.artists || []).map(a => a.name.toLowerCase());
      if (excludeId && artistIds.includes(excludeId)) continue;
      if (excludeName && artistNames.some(n => n.includes(excludeName.toLowerCase()))) continue;

      allTracks.push(track);
    }
  }

  if (!allTracks.length) return [];

  // Busca audio features para filtrar BPM
  const withFeatures = await getAudioFeatures(token, allTracks.slice(0, 60));

  // Filtra por BPM (±3 de tolerância)
  const filtered = withFeatures.filter(t =>
    t.tempo && t.tempo >= bpmRange.min - 3 && t.tempo <= bpmRange.max + 3
  );

  // Ordena por mais recente
  filtered.sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));

  return filtered.slice(0, 20).map(t => ({
    id:          t.id,
    name:        t.name,
    artist:      (t.artists || []).map(a => a.name).join(', '),
    album:       t.album?.name || '',
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

async function getArtistRecentTracks(token, artistId, sinceDate) {
  try {
    // Pega albums/singles recentes
    const r = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single,album&market=BR&limit=10`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    if (!r.ok) return [];
    const d = await r.json();

    // Filtra por data
    const recentAlbums = (d.items || []).filter(album => {
      const releaseDate = new Date(album.release_date);
      return releaseDate >= sinceDate;
    });

    if (!recentAlbums.length) return [];

    // Pega tracks de cada album recente
    const trackResults = await Promise.allSettled(
      recentAlbums.slice(0, 5).map(album => getAlbumTracks(token, album))
    );

    const tracks = [];
    for (const r of trackResults) {
      if (r.status === 'fulfilled') tracks.push(...(r.value || []));
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
  } catch(e) {
    return [];
  }
}

async function getAudioFeatures(token, tracks) {
  if (!tracks.length) return [];
  try {
    const ids = tracks.map(t => t.id).filter(Boolean).join(',');
    const r   = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${ids}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    if (!r.ok) return tracks.map(t => ({ ...t, tempo: 0 }));
    const d = await r.json();
    const featMap = {};
    (d.audio_features || []).forEach(f => { if (f) featMap[f.id] = f; });
    return tracks.map(t => ({
      ...t,
      ...(featMap[t.id] || { tempo: 0, key: -1, mode: 1 }),
    }));
  } catch(e) {
    return tracks.map(t => ({ ...t, tempo: 0 }));
  }
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function detectGroup(name) {
  if (!name) return 'g1';
  const n  = name.toLowerCase();
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
