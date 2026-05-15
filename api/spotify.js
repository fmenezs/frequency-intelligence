// api/spotify.js — Frequency Intelligence v4.3 — FMENEZS
// Usa /artists/{id}/albums + /albums/{id}/tracks (funciona com Client Credentials)
// top-tracks e audio-features são 403/deprecated — removidos

const CURATED_DB = [
  { g:'g1', family:'Winehouse',        artist:'Jaques Le Noir',    track:'Soul and Love',           label:'New Creatures',        bpm:null, dur:'6:33' },
  { g:'g1', family:'Winehouse',        artist:'Paul Lock',         track:'Say This Original Mix',   label:'Family Grooves',       bpm:124,  dur:'6:50' },
  { g:'g1', family:'Winehouse',        artist:'Franck Roger',      track:'Real Tone',               label:'Real Tone Records',    bpm:null, dur:'7:12' },
  { g:'g1', family:'Winehouse',        artist:'Gorge',             track:'Moving On',               label:'Seasons Limited',      bpm:null, dur:'6:44' },
  { g:'g1', family:'Winehouse',        artist:'Fouk',              track:'Bumblebee',               label:'Heist Recordings',     bpm:null, dur:'6:28' },
  { g:'g1', family:'Winehouse',        artist:'Frits Wentink',     track:'A Little Bit',            label:'Local Talk',           bpm:null, dur:'7:05' },
  { g:'g1', family:'Winehouse',        artist:'Dandara',           track:'Came Back Raw',           label:'Came Back Raw',        bpm:null, dur:'6:15' },
  { g:'g1', family:'Winehouse',        artist:'Demarkus Lewis',    track:'Keep On Movin',           label:'Keep On Movin EP',     bpm:null, dur:'6:55' },
  { g:'g1', family:'Groove Minimal',   artist:'DJ Sandwich',       track:'Chewi',                   label:'Hamkke Records',       bpm:null, dur:'6:18' },
  { g:'g1', family:'Groove Minimal',   artist:'Cem Gemalmaz',      track:'Somebody Extended Mix',   label:'Deeperfect',           bpm:123,  dur:'7:01' },
  { g:'g1', family:'Groove Minimal',   artist:'Subb-an',           track:'Gordos Groove',           label:'Subb-an',              bpm:null, dur:'6:35' },
  { g:'g1', family:'Deep Storytelling',artist:'Godblesscomputers', track:'Drowned in Blue',         label:'Ninja Tune',           bpm:null, dur:'5:44' },
  { g:'g1', family:'Deep Storytelling',artist:'16BL',              track:'Beat Organ',              label:'Anjunadeep',           bpm:null, dur:'7:20' },
  { g:'g1', family:'Deep Storytelling',artist:'Pablo Bolivar',     track:'Stories',                 label:'Other Stories',        bpm:null, dur:'8:02' },
  { g:'g2', family:'Progressive Warm', artist:'Sam Shure',         track:'Louna',                   label:'Innervisions',         bpm:null, dur:'8:35' },
  { g:'g2', family:'Progressive Warm', artist:'Alexander Sound',   track:'Love and Money',          label:'Manual Music',         bpm:null, dur:'7:40' },
  { g:'g2', family:'Progressive Warm', artist:'Evren Ulusoy',      track:'Dearly Devoted',          label:'Plastic City',         bpm:122,  dur:'7:06' },
  { g:'g2', family:'Progressive Warm', artist:'Hraach',            track:'Syna',                    label:'Innervisions',         bpm:null, dur:'7:48' },
  { g:'g2', family:'Progressive Warm', artist:'Abaze',             track:'Nebula',                  label:'Nebula',               bpm:null, dur:'8:10' },
  { g:'g2', family:'Progressive Warm', artist:'Doppel',            track:'The Alleys',              label:'The Alleys',           bpm:null, dur:'8:22' },
  { g:'g2', family:'Progressive Warm', artist:'Chris Barag',       track:'Movement',                label:'Movement Recordings',  bpm:null, dur:'7:55' },
  { g:'g2', family:'Progressive Warm', artist:'FMENEZS',           track:'LADR',                    label:'LADR',                 bpm:null, dur:'8:05' },
  { g:'g2', family:'Dreamy Progressive',artist:'Hans Gerd',        track:'Aurora',                  label:'Cybertron Records',    bpm:null, dur:'7:22' },
  { g:'g2', family:'Dreamy Progressive',artist:'FMENEZS',          track:'Morning Birds',           label:'LADR',                 bpm:null, dur:'7:15' },
  { g:'g2', family:'Dreamy Progressive',artist:'Lake Avalon',      track:'Stories In Light',        label:'Stories In Light',     bpm:null, dur:'7:44' },
  { g:'g2', family:'Dreamy Progressive',artist:'DAVI',             track:'Higher Than the Clouds',  label:'Higher Than the Clouds',bpm:null,dur:'8:12' },
  { g:'g2', family:'Dreamy Progressive',artist:'Aetha',            track:'Salvage',                 label:'Salvage',              bpm:null, dur:'7:30' },
  { g:'g2', family:'Dreamy Progressive',artist:'AudioStorm',       track:'Unknown Destination',     label:'Unknown Destination',  bpm:null, dur:'8:08' },
  { g:'g3', family:'Indie Melodic',    artist:'XENIA REAPER',      track:'Drift',                   label:'Nept Polarisation',    bpm:null, dur:'4:16' },
  { g:'g3', family:'Indie Melodic',    artist:'Superpoze',         track:'Obsession',               label:'Sicle',                bpm:null, dur:'5:47' },
  { g:'g3', family:'Indie Melodic',    artist:'MARINI',            track:'Nightshade',              label:'Purple Ice Records',   bpm:null, dur:'6:12' },
  { g:'g3', family:'Indie Melodic',    artist:'Dusky',             track:'17 Steps',                label:'17 Steps',             bpm:null, dur:'6:28' },
  { g:'g3', family:'Indie Melodic',    artist:'Sean Branton',      track:'Allies for Everyone',     label:'Allies for Everyone',  bpm:null, dur:'6:05' },
  { g:'g3', family:'Indie Melodic',    artist:'Vincenzo',          track:'Shango',                  label:'Shango Records',       bpm:null, dur:'7:10' },
  { g:'g4', family:'Hypnotic Raw',     artist:'Aris Kindt',        track:'Saichh Sequences',        label:'Now Claims My Timid Heart',bpm:null,dur:'7:45'},
  { g:'g4', family:'Hypnotic Raw',     artist:'Joachim Spieth',    track:'Chain',                   label:'Affin Records',        bpm:null, dur:'5:47' },
  { g:'g4', family:'Hypnotic Raw',     artist:'Amotik',            track:'Amotik EP',               label:'Amotik',               bpm:null, dur:'7:22' },
  { g:'g4', family:'Hypnotic Raw',     artist:'Frankie M.',        track:'Bark',                    label:'Luz De Selva',         bpm:null, dur:'7:02' },
  { g:'g4', family:'Hypnotic Raw',     artist:'Johannes Volk',     track:'Sonus Aurorae',           label:'Sonus Aurorae',        bpm:null, dur:'8:10' },
  { g:'g4', family:'Hypnotic Raw',     artist:'Azu Tiwaline',      track:'Belladonna',              label:'Belladonna',           bpm:null, dur:'7:55' },
  { g:'g4', family:'Hypnotic Raw',     artist:'Altinbas',          track:'Festina Lente',           label:'Festina Lente',        bpm:null, dur:'6:48' },
  { g:'g4', family:'Peak Raw',         artist:'Dino Sabatini',     track:'Euphemus',                label:'Chiron',               bpm:null, dur:'7:20' },
  { g:'g4', family:'Peak Raw',         artist:'Future Simplicity', track:'Maize Maze',              label:'Blending Frequencies', bpm:null, dur:'6:05' },
  { g:'g4', family:'Peak Raw',         artist:'DJ Bone',           track:'Subject Detroit',         label:'Subject Detroit',      bpm:null, dur:'7:44' },
  { g:'g4', family:'Peak Raw',         artist:'BLZS',              track:'Melancholic Therapy',     label:'Melancholic Therapy',  bpm:null, dur:'7:12' },
  { g:'g4', family:'Peak Raw',         artist:'Danniel selfmade',  track:'Nothing Stays The Same',  label:'Nothing Stays The Same',bpm:null,dur:'6:55' },
  { g:'g6', family:'Afro Groove',      artist:'MacZito',           track:'Pictures',                label:'Canvas of Sound',      bpm:null, dur:'7:05' },
  { g:'g6', family:'Afro Groove',      artist:'CHOMBA',            track:'Fermee',                  label:'The Leftovers',        bpm:null, dur:'6:40' },
  { g:'g6', family:'Afro Groove',      artist:'Sparrow & Barbossa',track:'Cycles',                  label:'Cycles',               bpm:null, dur:'7:22' },
  { g:'g6', family:'Afro Groove',      artist:'Djena',             track:'Cherry Vanilla',          label:'Cherry Vanilla',       bpm:null, dur:'6:50' },
  { g:'g6', family:'Afro Groove',      artist:'Alley SA',          track:'Abusadora',               label:'Abusadora',            bpm:null, dur:'7:15' },
  { g:'g6', family:'Afro Groove',      artist:'Fabian Balino',     track:'Break Your Heart',        label:'Break Your Heart',     bpm:null, dur:'6:33' },
  { g:'g6', family:'Afro Groove',      artist:'Citizen Deep',      track:'Maline Aura',             label:'Canvas of Sound',      bpm:null, dur:'8:05' },
  { g:'g7', family:'Organic Emotional',artist:'Hugo Samba',        track:'Frenka',                  label:'Sounds Of Sirin',      bpm:null, dur:'7:18' },
  { g:'g7', family:'Organic Emotional',artist:'Sebastian Mullaert',track:'Traces',                  label:'Independent',          bpm:null, dur:'7:28' },
  { g:'g7', family:'Organic Emotional',artist:'Mauro Masi',        track:'Morning',                 label:'Morning EP',           bpm:null, dur:'7:02' },
  { g:'g7', family:'Organic Emotional',artist:'Emilio Tornqvist',  track:'Rumena',                  label:'Rumena',               bpm:null, dur:'6:44' },
  { g:'g7', family:'Organic Emotional',artist:'Mo-Omar',           track:'Sad Island',              label:'Sad Island',           bpm:null, dur:'8:12' },
  { g:'g7', family:'Organic Emotional',artist:'Elavenu',           track:'Kairos',                  label:'Kairos',               bpm:null, dur:'6:30' },
  { g:'g7', family:'Organic Emotional',artist:'BuVu',              track:'Guardians',               label:'Guardians',            bpm:null, dur:'8:05' },
  { g:'g7', family:'Organic Emotional',artist:'BOHEM',             track:'Selection',               label:'Sounds Of Sirin 2025', bpm:null, dur:'7:20' },
  { g:'g7', family:'Spiritual Organic', artist:'AIWAA',            track:'Satori',                  label:'Satori',               bpm:null, dur:'7:55' },
];

// IDs verificados — usados para /albums (funciona com Client Credentials)
const ARTIST_IDS = {
  g1: [
    { name:'Franck Roger',             id:'2r6vXSmwVQSHMHqRiVOjLK' },
    { name:'Fouk',                     id:'4JT6E8pevxBqWvjfPj3WlR' },
    { name:'Frits Wentink',            id:'3JLfYFhKkFiHbqHVDRBYYZ' },
    { name:'Jimpster',                 id:'2PpCJnlSvLRfTqRVjuJg1s' },
    { name:'Deetron',                  id:'3NSGqcfHREWoJQvTEJSmk5' },
    { name:'Motor City Drum Ensemble', id:'6vBmZRiCEuaS0WBmTJqRYi' },
    { name:'Dan Shake',                id:'1ULpDcD5UVP3V66FkWbBc3' },
    { name:'Theo Parrish',             id:'5I8rrAmYqJON8qHd0IaD3d' },
  ],
  g2: [
    { name:'Sam Shure',       id:'51YmUpitluHsvMTXJ2rsiN' },
    { name:'Hraach',          id:'6rdTxNwQhUJTodUx7voWXO' },
    { name:'Guy J',           id:'0Dl8j8IPLZ0EGRBizZfDdl' },
    { name:'Nox Vahn',        id:'2bqGPuC8kDCTLWieGOyWxu' },
    { name:'Nick Warren',     id:'6FsDOSI9jnvPeWqQBXqAOr' },
    { name:'Hernan Cattaneo', id:'4k1O3e7MMAm2V6xqQcFGKj' },
    { name:'Cubicolor',       id:'5bqkAMiapKkGVCbBDMvJJV' },
    { name:'Matthew Dekay',   id:'05j0SfMjNJPtSGlTtEjUMH' },
  ],
  g3: [
    { name:'Bicep',           id:'73A3bLnfnz5BoQjb4gNCga' },
    { name:'WhoMadeWho',      id:'3aRI0QFhFTaCQ1TRBi9zVk' },
    { name:'Recondite',       id:'2vz6GxfbFjRQI7fqCHBnN6' },
    { name:'Innellea',        id:'1P2cPFRjXgRLFVgxWCjDOY' },
    { name:'Dusky',           id:'1DsQKUqQFmPbLTqjnf7BKW' },
    { name:'Ross From Friends',id:'7dJdq0x3vkRfFPeGNcBGe8'},
  ],
  g4: [
    { name:'Joachim Spieth',  id:'1PKtSAYVgTMH2rEGMPLTOO' },
    { name:'Oscar Mulero',    id:'4HY5hFGaOSSYfQVn6FXLQG' },
    { name:'Surgeon',         id:'4CLovOkMdpuDAGjJ7u1iia' },
    { name:'Blawan',          id:'0LdSRmLf2yDXW0rjOIj5vH' },
    { name:'Paula Temple',    id:'1tSaXkEWFkDsTLVkjLPdj5' },
    { name:'Phase Fatale',    id:'3I4VBbmq1gBNWLeBkbRqeP' },
  ],
  g5: [
    { name:'Reinier Zonneveld', id:'21A7bhIL1m6CNZn8y57PIZ' },
    { name:'I Hate Models',     id:'6DX1IPGLEiFNsVkBniLAAj' },
    { name:'SPFDJ',             id:'7FcMHrDMaXiAHAy1H1WPIL' },
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

// ── PROXY DE IMAGEM (evita CORS/hotlink do Spotify) ─────────────
async function proxyImage(url, res) {
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (!r.ok) { res.status(404).end(); return; }
    const buf = await r.arrayBuffer();
    const ct = r.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', ct);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(Buffer.from(buf));
  } catch(e) {
    res.status(404).end();
  }
}

export default async function handler(req, res) {
  // Proxy de imagem: /api/spotify?img=URL
  if (req.query.img) {
    return proxyImage(decodeURIComponent(req.query.img), res);
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-FI-Version', '4.3');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const q = req.query;
  console.log('[FI v4.3] params:', JSON.stringify(q));

  try {
    const token = await getToken();
    console.log('[FI] Token OK');

    if (q.artist)   return res.status(200).json(await searchArtist(token, q.artist));
    if (q.id)       return res.status(200).json(await fetchArtistById(token, q.id));
    if (q.search)   return res.status(200).json(await searchFree(token, q.search));
    if (q.test)     return res.status(200).json(await runTest(token, q.test));

    if (q.headliner) {
      return res.status(200).json(await generateSet(token, {
        headliner: q.headliner,
        slot:      q.slot || 'slot1',
        days:      parseInt(q.days) || 90,
        yearFrom:  q.yearFrom ? parseInt(q.yearFrom) : null,
        yearTo:    q.yearTo   ? parseInt(q.yearTo)   : null,
      }));
    }

    return res.status(200).json({ service:'Frequency Intelligence', version:'4.3', status:'online' });

  } catch (err) {
    console.error('[FI] ERRO:', err.message, err.stack);
    return res.status(500).json({ error: err.message, tracks: [], total: 0 });
  }
}

async function getToken() {
  const { SPOTIFY_CLIENT_ID: cid, SPOTIFY_CLIENT_SECRET: csec } = process.env;
  if (!cid || !csec) throw new Error('Missing Spotify credentials');
  const b64 = Buffer.from(`${cid}:${csec}`).toString('base64');
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Authorization': `Basic ${b64}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  if (!r.ok) { const t = await r.text(); throw new Error(`Token failed ${r.status}: ${t}`); }
  return (await r.json()).access_token;
}

async function generateSet(token, { headliner, slot, days, yearFrom, yearTo }) {
  const hlKey = Object.keys(HEADLINER_MAP).find(k => k === headliner.toLowerCase());
  const group = hlKey ? HEADLINER_MAP[hlKey] : 'g1';
  const bpmRange = SLOT_BPM[slot] || SLOT_BPM.slot1;

  console.log(`[FI] headliner="${headliner}" group=${group} slot=${slot}`);

  // Spotify via álbuns (único endpoint que funciona com Client Credentials)
  const spotifyTracks = await getTracksFromAlbums(token, group, headliner, days, yearFrom, yearTo);
  console.log(`[FI] spotify=${spotifyTracks.length}`);

  // Banco curado FMENEZS
  const curatedPool = CURATED_DB.filter(t => t.g === group);
  const curatedFormatted = shuffle(curatedPool).slice(0, 4).map(t => ({
    id: null, name: t.track, artist: t.artist, album: t.label,
    bpm: t.bpm || null, key: null, duration: t.dur,
    releaseDate: null, previewUrl: null, spotifyUrl: null,
    image: null, popularity: null,
    source: 'curated_fmenezs', family: t.family, group,
  }));

  const combined = dedup([...spotifyTracks.slice(0, 8), ...curatedFormatted]);
  const final = shuffle(combined).slice(0, 12);

  return {
    headliner, group, slot, bpmRange,
    tracks: final, total: final.length,
    sources: { spotify: spotifyTracks.length, curated: curatedFormatted.length },
  };
}

// Único fluxo que funciona com Client Credentials:
// /artists/{id}/albums → /albums/{id}/tracks
async function getTracksFromAlbums(token, group, excludeName, days, yearFrom, yearTo) {
  const artistList = ARTIST_IDS[group] || ARTIST_IDS.g6;
  const picked = shuffle(artistList)
    .filter(a => a.name.toLowerCase() !== excludeName.toLowerCase())
    .slice(0, 5);

  const allTracks = [];
  const seen = new Set();

  // Paralelo: busca álbuns de todos os artistas ao mesmo tempo
  const artistResults = await Promise.all(picked.map(async (artist) => {
    const tracks = [];
    try {
      console.log(`[FI] Albums for: ${artist.name}`);
      const r = await fetch(
        `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=single,album&limit=10&market=US`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!r.ok) { console.log(`[FI] Albums ${r.status} for ${artist.name}`); return tracks; }
      const d = await r.json();
      let albums = d.items || [];
      console.log(`[FI] ${artist.name}: ${albums.length} albums`);

      // Filtro por período
      if (yearFrom && yearTo) {
        const filtered = albums.filter(a => {
          const y = parseInt((a.release_date || '').split('-')[0]);
          return y >= yearFrom && y <= yearTo;
        });
        albums = filtered.length ? filtered : albums.slice(0, 3);
      } else {
        const since = new Date();
        since.setDate(since.getDate() - days);
        const recent = albums.filter(a => a.release_date && new Date(a.release_date) >= since);
        albums = recent.length ? recent.slice(0, 2) : albums.slice(0, 2);
      }

      // Pega tracks de até 2 álbuns em paralelo
      const albumTrackResults = await Promise.all(albums.slice(0, 2).map(async (album) => {
        try {
          const tr = await fetch(
            `https://api.spotify.com/v1/albums/${album.id}/tracks?limit=8&market=US`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (!tr.ok) return [];
          const td = await tr.json();
          return shuffle(td.items || []).slice(0, 2).map(t => ({
            id: t.id,
            name: t.name,
            artist: (t.artists || []).map(a => a.name).join(', '),
            album: album.name,
            bpm: null, key: null,
            duration: formatDuration(t.duration_ms),
            releaseDate: album.release_date || '',
            previewUrl: t.preview_url || '',
            spotifyUrl: t.external_urls?.spotify || '',
            image: album.images?.[1]?.url || album.images?.[0]?.url || '',
            popularity: 0,
            source: 'spotify_album',
            group,
          }));
        } catch(e) { return []; }
      }));

      albumTrackResults.forEach(ts => tracks.push(...ts));
    } catch(e) { console.log(`[FI] Artist err ${artist.name}:`, e.message); }
    return tracks;
  }));

  // Merge todos os resultados
  for (const artistTracks of artistResults) {
    for (const t of artistTracks) {
      if (!t?.id) continue;
      const key = `${t.name}|||${t.artist}`.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      allTracks.push(t);
    }
  }

  console.log(`[FI] getTracksFromAlbums total: ${allTracks.length}`);
  return allTracks;
}

async function runTest(token, group) {
  const grp = ARTIST_IDS[group] ? group : 'g6';
  const testArtist = ARTIST_IDS[grp][0];
  const result = { version: '4.3', group: grp, testArtist: testArtist.name };

  try {
    const r = await fetch(
      `https://api.spotify.com/v1/artists/${testArtist.id}/albums?include_groups=single,album&limit=5&market=US`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    result.albumsStatus = r.status;
    if (r.ok) {
      const d = await r.json();
      const albums = d.items || [];
      result.albumsFound = albums.length;
      result.latestAlbum = albums[0]?.name || null;

      // Testa pegar tracks do primeiro álbum
      if (albums[0]) {
        const tr = await fetch(
          `https://api.spotify.com/v1/albums/${albums[0].id}/tracks?limit=3&market=US`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        result.tracksStatus = tr.status;
        if (tr.ok) {
          const td = await tr.json();
          result.sampleTracks = (td.items || []).slice(0, 3).map(t => ({
            name: t.name,
            artist: t.artists?.[0]?.name,
            hasPreview: !!t.preview_url,
          }));
        }
      }
    } else {
      result.albumsError = await r.text();
    }
  } catch(e) { result.error = e.message; }

  result.curatedCount = CURATED_DB.filter(t => t.g === grp).length;
  result.status = 'OK';
  return result;
}

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

function dedup(tracks) {
  const seen = new Set();
  return tracks.filter(t => {
    const k = `${t.name}|||${t.artist}`.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
