// api/spotify.js — Vercel Serverless Function
// Endpoints:
//   GET /api/spotify              → retorna access_token (client credentials)
//   GET /api/spotify?artist=NAME  → busca artista pelo nome, retorna foto + info
//   GET /api/spotify?id=SPOTIFY_ID → busca artista pelo ID, retorna foto + info
//   GET /api/spotify?search=QUERY → busca DJs/artistas livres no Spotify

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { artist, id, search } = req.query;

  try {
    // 1. Pegar token via Client Credentials
    const token = await getToken();

    // 2. Se só pediu o token
    if (!artist && !id && !search) {
      return res.status(200).json({ access_token: token });
    }

    // 3. Busca por ID direto
    if (id) {
      const data = await fetchArtistById(token, id);
      return res.status(200).json(data);
    }

    // 4. Busca por nome exato do artista do banco
    if (artist) {
      const data = await searchArtist(token, artist);
      return res.status(200).json(data);
    }

    // 5. Busca livre (para expandir fora do banco)
    if (search) {
      const data = await searchFree(token, search);
      return res.status(200).json(data);
    }

  } catch (err) {
    console.error('Spotify API error:', err);
    return res.status(500).json({ error: err.message });
  }
}

// ── AUTH ─────────────────────────────────────────────────────────
async function getToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify credentials in environment variables');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

// ── BUSCA POR ID ─────────────────────────────────────────────────
async function fetchArtistById(token, artistId) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Artist fetch failed: ${response.status}`);
  }

  const data = await response.json();
  return formatArtist(data);
}

// ── BUSCA POR NOME ────────────────────────────────────────────────
async function searchArtist(token, artistName) {
  const query = encodeURIComponent(artistName);
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  const data = await response.json();
  const artist = data.artists?.items?.[0];

  if (!artist) {
    return { name: artistName, photo: '', genres: [], followers: 0, spotifyUrl: '' };
  }

  return formatArtist(artist);
}

// ── BUSCA LIVRE ───────────────────────────────────────────────────
async function searchFree(token, query) {
  const encoded = encodeURIComponent(query);
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encoded}&type=artist&limit=8`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );

  if (!response.ok) {
    throw new Error(`Free search failed: ${response.status}`);
  }

  const data = await response.json();
  const artists = data.artists?.items || [];

  return {
    results: artists.map(formatArtist),
  };
}

// ── FORMAT ────────────────────────────────────────────────────────
function formatArtist(artist) {
  return {
    id: artist.id,
    name: artist.name,
    photo: artist.images?.[0]?.url || '',
    photoSmall: artist.images?.[2]?.url || artist.images?.[0]?.url || '',
    genres: artist.genres || [],
    followers: artist.followers?.total || 0,
    popularity: artist.popularity || 0,
    spotifyUrl: artist.external_urls?.spotify || '',
  };
}
