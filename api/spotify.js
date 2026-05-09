export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { artists, genre, limit = 10 } = req.body;

  try {
    // 1. Pegar token do Spotify
    const tokenResp = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    });
    const tokenData = await tokenResp.json();
    const token = tokenData.access_token;
    if (!token) throw new Error('Spotify auth failed');

    const results = [];

    // 2. Buscar últimos lançamentos dos artistas do lineup
    if (artists && artists.length > 0) {
      for (const artist of artists.slice(0, 3)) {
        const searchResp = await fetch(
          `https://api.spotify.com/v1/search?q=artist:${encodeURIComponent(artist)}&type=track&limit=5&market=BR`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const searchData = await searchResp.json();
        const tracks = searchData.tracks?.items || [];
        tracks.forEach(t => {
          results.push({
            title: t.name,
            artist: t.artists.map(a => a.name).join(', '),
            album: t.album.name,
            year: t.album.release_date?.substring(0, 4),
            spotify_url: t.external_urls.spotify,
            preview_url: t.preview_url,
            image: t.album.images?.[1]?.url,
            source: 'spotify',
            headliner_track: true,
          });
        });
      }
    }

    // 3. Buscar tracks por gênero/contexto
    if (genre) {
      const genreResp = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(genre)}&type=track&limit=${limit}&market=BR`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const genreData = await genreResp.json();
      const tracks = genreData.tracks?.items || [];
      tracks.forEach(t => {
        results.push({
          title: t.name,
          artist: t.artists.map(a => a.name).join(', '),
          album: t.album.name,
          year: t.album.release_date?.substring(0, 4),
          spotify_url: t.external_urls.spotify,
          preview_url: t.preview_url,
          image: t.album.images?.[1]?.url,
          source: 'spotify',
          headliner_track: false,
        });
      });
    }

    res.status(200).json({ tracks: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
