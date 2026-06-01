// api/spotify.js — Frequency Intelligence v7.0 — FMENEZS

// Banco curado usado como REFERÊNCIA de artistas (não retornado diretamente)
const CURATED_ARTISTS = {
  g1: ['Franck Roger','Fouk','Frits Wentink','Jimpster','Dan Shake','Gorge','Pablo Bolivar','16BL','Godblesscomputers','Cem Gemalmaz','DJ Sandwich','Subb-an','Demarkus Lewis'],
  g2: ['Sam Shure','Hraach','Evren Ulusoy','Alexander Sound','Chris Barag','AudioStorm','Dunadry','Hans Gerd','DAVI'],
  g3: ['XENIA REAPER','Superpoze','Dusky','Sean Branton','MARINI','Vincenzo','Soudant'],
  g4: ['Aris Kindt','Joachim Spieth','Amotik','Altinbas','Johannes Volk','Azu Tiwaline','Dino Sabatini','Future Simplicity','DJ Bone','BLZS','Danniel selfmade'],
  g5: ['Reinier Zonneveld','I Hate Models','SPFDJ'],
  g6: ['MacZito','CHOMBA','Sparrow & Barbossa','Citizen Deep','Fabian Balino','Djena','Alley SA'],
  g7: ['Hugo Samba','Sebastian Mullaert','Mauro Masi','Emilio Tornqvist','Mo-Omar','Elavenu','BuVu','BOHEM','AIWAA'],
};

// IDs verificados no Spotify — backbone da busca
const ARTIST_IDS = {
  g1: [
    { name:'Franck Roger',             id:'2r6vXSmwVQSHMHqRiVOjLK' },
    { name:'Fouk',                     id:'4JT6E8pevxBqWvjfPj3WlR' },
    { name:'Frits Wentink',            id:'3JLfYFhKkFiHbqHVDRBYYZ' },
    { name:'Jimpster',                 id:'2PpCJnlSvLRfTqRVjuJg1s' },
    { name:'Motor City Drum Ensemble', id:'6vBmZRiCEuaS0WBmTJqRYi' },
    { name:'Dan Shake',                id:'1ULpDcD5UVP3V66FkWbBc3' },
    { name:'Kerri Chandler',           id:'51tYDGpHPVBSmVjirw3lFy' },
    { name:'Honey Dijon',              id:'3yGSRjp9aYZeWuLKJSmGgV' },
    { name:'Mochakk',                  id:'7dqFBBfQMGQdXaREVHj1i8' },
    { name:'Pablo Bolivar',            id:'3NSGqcfHREWoJQvTEJSmk5' },
  ],
  g2: [
    { name:'Sam Shure',       id:'51YmUpitluHsvMTXJ2rsiN' },
    { name:'Hraach',          id:'6rdTxNwQhUJTodUx7voWXO' },
    { name:'Guy J',           id:'0Dl8j8IPLZ0EGRBizZfDdl' },
    { name:'Nox Vahn',        id:'2bqGPuC8kDCTLWieGOyWxu' },
    { name:'Nick Warren',     id:'6FsDOSI9jnvPeWqQBXqAOr' },
    { name:'Hernan Cattaneo', id:'4k1O3e7MMAm2V6xqQcFGKj' },
    { name:'Cubicolor',       id:'5bqkAMiapKkGVCbBDMvJJV' },
    { name:'Sasha',           id:'2SHyvQHTbMoFVT5s5LkS38' },
    { name:'John Digweed',    id:'2xe8IUDrCEKZJOFqxZUB6J' },
  ],
  g3: [
    { name:'Bicep',            id:'73A3bLnfnz5BoQjb4gNCga' },
    { name:'WhoMadeWho',       id:'3aRI0QFhFTaCQ1TRBi9zVk' },
    { name:'Recondite',        id:'2vz6GxfbFjRQI7fqCHBnN6' },
    { name:'Dusky',            id:'1DsQKUqQFmPbLTqjnf7BKW' },
    { name:'Ross From Friends',id:'7dJdq0x3vkRfFPeGNcBGe8' },
    { name:'Tale Of Us',       id:'0F4iAEMFdSGR5qFOGk2Bvg' },
    { name:'Adriatique',       id:'7aS8K2M1qBMlPEeTmImEYF' },
    { name:'ARTBAT',           id:'3zy26r3t4BOlwBGbFxmYlG' },
    { name:'Anyma',            id:'0bjTNsHtWFGVoZ8yvv1y7k' },
  ],
  g4: [
    { name:'Joachim Spieth',     id:'1PKtSAYVgTMH2rEGMPLTOO' },
    { name:'Oscar Mulero',       id:'4HY5hFGaOSSYfQVn6FXLQG' },
    { name:'Surgeon',            id:'4CLovOkMdpuDAGjJ7u1iia' },
    { name:'Blawan',             id:'0LdSRmLf2yDXW0rjOIj5vH' },
    { name:'Phase Fatale',       id:'3I4VBbmq1gBNWLeBkbRqeP' },
    { name:'Charlotte de Witte', id:'5O30s0HaU7PMmlFAeWtLrM' },
    { name:'Amelie Lens',        id:'5UYjFjdCGnIjFPAMPXdFsj' },
    { name:'Adam Beyer',         id:'7wX4BaEhFMRJ5sXdCMKF8g' },
    { name:'Ancient Methods',    id:'1GmsPCcCHmFzBp0o5wH9WS' },
  ],
  g5: [
    { name:'Reinier Zonneveld', id:'21A7bhIL1m6CNZn8y57PIZ' },
    { name:'I Hate Models',     id:'6DX1IPGLEiFNsVkBniLAAj' },
    { name:'SPFDJ',             id:'7FcMHrDMaXiAHAy1H1WPIL' },
    { name:'Sara Landry',       id:'4NpFsd2PNkFgHNkLFqzBFP' },
  ],
  g6: [
    { name:'Black Coffee',    id:'6wMr4zKPrrR0UVz08WtUWc' },
    { name:'Adam Port',       id:'2loEsOijJ6XiGzWYFXMIRk' },
    { name:'Bedouin',         id:'5bKdC6382t97Qnpvs81Rqx' },
    { name:'Damian Lazarus',  id:'7rPVEECPRcpxP4XS1fkHgP' },
    { name:'Ahmed Spins',     id:'4jercY4pUhY6jB8eQjpVJV' },
    { name:'Themba',          id:'0tOCJpAHFXBxSQzMBfhpIq' },
    { name:'Enoo Napa',       id:'5QrMrTGcX0jyXMxRZGzgbt' },
    { name:'Rampa',           id:'3R37lMSoiWxOZZCKRNt5dN' },
    { name:'Da Capo',         id:'1N0Uqpov1NHvJDkYb9NlNK' },
    { name:'Sun-El Musician', id:'4lEoyJBmHHBrFAfmvHRhfZ' },
  ],
  g7: [
    { name:'Satori',          id:'5nri3hyKmKBGAfvjBi0mK0' },
    { name:'Lee Burridge',    id:'1RNm0r3ViSTQNIFCMUhM7a' },
    { name:'Mauro Masi',      id:'4DB7roKjBDAuccMLQrzXX9' },
    { name:'Hraach',          id:'6rdTxNwQhUJTodUx7voWXO' },
    { name:'Bonobo',          id:'0cmWgDlu9CwTgxPhf403hb' },
    { name:'Monolink',        id:'2m4WFg9cExkUcXg0YvAaHp' },
    { name:'Worakls',         id:'3nwbMWRXDZ0fMBzMDQpIKW' },
    { name:'Nicola Cruz',     id:'4NTK7g2MLcT2jTpHKaHAbG' },
    { name:'Acid Pauli',      id:'0YSINODhS5oDJGxGsOqo7i' },
    { name:'Bedouin',         id:'5bKdC6382t97Qnpvs81Rqx' },
  ],
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

async function proxyImage(url, res) {
  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
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
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-FI-Version', '7.0');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const q = req.query;
  console.log('[FI v7.0] params:', JSON.stringify(q));

  try {
    const token = await getToken();
    if (q.artist)    return res.status(200).json(await searchArtist(token, q.artist));
    if (q.id)        return res.status(200).json(await fetchArtistById(token, q.id));
    if (q.search)    return res.status(200).json(await searchFree(token, q.search));
    if (q.test)      return res.status(200).json(await runTest(token, q.test));
    if (q.headliner) return res.status(200).json(await generateSet(token, q.headliner, q.slot||'slot1'));
    return res.status(200).json({ service:'Frequency Intelligence', version:'7.0', status:'online' });
  } catch (err) {
    console.error('[FI] ERRO:', err.message);
    return res.status(500).json({ error: err.message, tracks: [], total: 0 });
  }
}

async function getToken() {
  const { SPOTIFY_CLIENT_ID: cid, SPOTIFY_CLIENT_SECRET: csec } = process.env;
  if (!cid || !csec) throw new Error('Missing Spotify credentials');
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
  console.log(`[FI] headliner="${headliner}" group=${group}`);

  // Busca IDs dos artistas de referência do banco curado
  const refNames = CURATED_ARTISTS[group] || [];
  const refArtists = await resolveArtistIds(token, refNames, ARTIST_IDS[group] || []);
  console.log(`[FI] ${refArtists.length} artistas para buscar`);

  const tracks = await fetchAlbumTracks(token, refArtists, headliner);
  console.log(`[FI] ${tracks.length} tracks do Spotify`);

  return {
    headliner, group, slot, bpmRange,
    tracks: tracks.slice(0, 12),
    total: tracks.length,
    sources: { spotify: tracks.length, curated: 0 },
  };
}

// Resolve nomes para IDs — usa lista fixa como cache, busca o resto
async function resolveArtistIds(token, names, fixedList) {
  const fixed = new Map(fixedList.map(a => [a.name.toLowerCase(), a]));
  const result = [];

  await Promise.all(names.map(async (name) => {
    const existing = fixed.get(name.toLowerCase());
    if (existing) { result.push(existing); return; }
    try {
      const r = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1&market=US`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!r.ok) return;
      const d = await r.json();
      const a = d.artists?.items?.[0];
      if (a) { result.push({ name: a.name, id: a.id }); }
    } catch(e) {}
  }));

  // Adiciona artistas da lista fixa que não estão ainda
  for (const a of fixedList) {
    if (!result.find(r => r.id === a.id)) result.push(a);
  }

  return shuffle(result).slice(0, 10);
}

// Busca tracks dos álbuns — SEM filtro de tempo, máx 2 por artista
async function fetchAlbumTracks(token, artists, excludeName) {
  const allTracks = [];
  const seen = new Set();
  const artistCount = {};

  const results = await Promise.all(artists.map(async (artist) => {
    if (artist.name.toLowerCase() === excludeName.toLowerCase()) return [];
    try {
      const r = await fetch(
        `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=single,album&limit=20&market=US`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!r.ok) { console.log(`[FI] Albums ${r.status} for ${artist.name}`); return []; }
      const d = await r.json();
      const albums = (d.items || []).slice(0, 5);
      console.log(`[FI] ${artist.name}: ${albums.length} álbuns`);

      const trackResults = await Promise.all(albums.map(async (album) => {
        try {
          const tr = await fetch(
            `https://api.spotify.com/v1/albums/${album.id}/tracks?limit=10&market=US`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (!tr.ok) return [];
          const td = await tr.json();
          const pick = shuffle(td.items || [])[0];
          if (!pick?.id) return [];
          return [{
            id: pick.id,
            name: pick.name,
            artist: (pick.artists||[]).map(a=>a.name).join(', '),
            album: album.name,
            bpm: null, key: null,
            duration: formatDuration(pick.duration_ms),
            releaseDate: album.release_date||'',
            previewUrl: pick.preview_url||'',
            spotifyUrl: pick.external_urls?.spotify||'',
            image: album.images?.[1]?.url||album.images?.[0]?.url||'',
            source: 'spotify_album',
            _artistName: artist.name,
          }];
        } catch(e) { return []; }
      }));
      return trackResults.flat();
    } catch(e) { console.log(`[FI] Err ${artist.name}:`, e.message); return []; }
  }));

  // Merge com dedup e máx 2 por artista
  for (const artistTracks of results) {
    for (const t of artistTracks) {
      if (!t?.id) continue;
      const key = `${t.name}|||${t.artist}`.toLowerCase();
      if (seen.has(key)) continue;
      const aKey = t._artistName;
      if ((artistCount[aKey]||0) >= 2) continue;
      seen.add(key);
      artistCount[aKey] = (artistCount[aKey]||0) + 1;
      allTracks.push(t);
    }
  }

  console.log(`[FI] fetchAlbumTracks total: ${allTracks.length}`);
  return allTracks;
}

async function runTest(token, group) {
  const grp = ARTIST_IDS[group] ? group : 'g6';
  const testArtist = ARTIST_IDS[grp][0];
  const result = { version:'7.0', group:grp, testArtist:testArtist.name };
  try {
    const r = await fetch(
      `https://api.spotify.com/v1/artists/${testArtist.id}/albums?include_groups=single,album&limit=5&market=US`,
      { headers: { Authorization:`Bearer ${token}` } }
    );
    result.albumsStatus = r.status;
    if (r.ok) {
      const d = await r.json();
      result.albumsFound = d.items?.length||0;
      result.latestAlbum = d.items?.[0]?.name||null;
      if (d.items?.[0]) {
        const tr = await fetch(`https://api.spotify.com/v1/albums/${d.items[0].id}/tracks?limit=3&market=US`,
          { headers: { Authorization:`Bearer ${token}` } });
        if (tr.ok) {
          const td = await tr.json();
          result.sampleTracks = (td.items||[]).slice(0,3).map(t=>({
            name:t.name, artist:t.artists?.[0]?.name, hasPreview:!!t.preview_url
          }));
        }
      }
    }
  } catch(e) { result.error = e.message; }
  result.status = 'OK';
  return result;
}

async function searchArtist(token, name) {
  const r = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`,
    { headers: { Authorization:`Bearer ${token}` } });
  if (!r.ok) throw new Error(`Artist search failed: ${r.status}`);
  const d = await r.json();
  const a = d.artists?.items?.[0];
  if (!a) return { name, photo:'', group:detectGroup(name) };
  return { ...formatArtist(a), group:detectGroup(name) };
}

async function fetchArtistById(token, id) {
  const r = await fetch(`https://api.spotify.com/v1/artists/${id}`,
    { headers: { Authorization:`Bearer ${token}` } });
  if (!r.ok) throw new Error(`Artist fetch failed: ${r.status}`);
  const a = await r.json();
  return { ...formatArtist(a), group:detectGroup(a.name) };
}

async function searchFree(token, query) {
  const r = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=8`,
    { headers: { Authorization:`Bearer ${token}` } });
  if (!r.ok) throw new Error(`Free search failed: ${r.status}`);
  const d = await r.json();
  return { results:(d.artists?.items||[]).map(a=>({...formatArtist(a),group:detectGroup(a.name)})) };
}

function formatArtist(a) {
  return { id:a.id, name:a.name, photo:a.images?.[0]?.url||'',
    photoSmall:a.images?.[2]?.url||a.images?.[0]?.url||'',
    genres:a.genres||[], followers:a.followers?.total||0,
    popularity:a.popularity||0, spotifyUrl:a.external_urls?.spotify||'' };
}

function detectGroup(name) {
  if (!name) return 'g1';
  const n = name.toLowerCase();
  const key = Object.keys(HEADLINER_MAP).find(k => n.includes(k));
  return key ? HEADLINER_MAP[key] : 'g1';
}

function formatDuration(ms) {
  if (!ms) return '';
  const m = Math.floor(ms/60000);
  const s = Math.floor((ms%60000)/1000);
  return `${m}:${s.toString().padStart(2,'0')}`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
