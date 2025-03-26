import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SongList() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Zenék betöltése a backendről
useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsRes, albumsRes, artistsRes, genresRes, instrumentsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:3000/songs'),
          axios.get('http://localhost:3000/albums'),
          axios.get('http://localhost:3000/artists'),
          axios.get('http://localhost:3000/genres'),
          axios.get('http://localhost:3000/instruments'),
          axios.get('http://localhost:3000/users'),
        ]);

        setSongs(songsRes.data);
        setAlbums(albumsRes.data);
        setArtists(artistsRes.data);
        setGenres(genresRes.data);
        setInstruments(instrumentsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Hiba az adatok betöltésében:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  // Segédfüggvények
  const getAlbumName = (albumId) => 
    albums.find(album => album.albumId === albumId)?.albumName || 'Nincs album';

  const getArtistName = (artistId) => 
    artists.find(artist => artist.artistId === artistId)?.artistName || 'Ismeretlen előadó';

  const getGenreName = (genreId) => 
    genres.find(genre => genre.genreId === genreId)?.genreName || 'Ismeretlen műfaj';

  const getInstrumentName = (instrumentId) => 
    instruments.find(instrument => instrument.instrumentId === instrumentId)?.instrumentName || 'Nincs hangszer';

  const getUploaderName = (songUploaderId) => 
    users.find(user => user.userId === songUploaderId)?.userName || 'Ismeretlen felhasználó';

  if (loading) return <div className="loading">Betöltés...</div>;

  return (
    <div className="song-table">
      <table>
        <thead>
          <tr>
            <th>Cím</th>
            <th>Előadó</th>
            <th>Album</th>
            <th>Műfaj</th>
            <th>Hangszer</th>
            <th>Feltöltő</th>
            <th>Elérési út</th>
            <th>Cover</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.songId}>
              <td>{song.songName}</td>
              <td>{getArtistName(song.artistId)}</td>
              <td>{getAlbumName(song.albumId)}</td>
              <td>{getGenreName(song.genreId)}</td>
              <td>{getInstrumentName(song.instrumentId)}</td>
              <td>{getUploaderName(song.songUploaderId)}</td>
              <td>{song.songPath}</td>
              <td>{song.songImage || "placeholder.jpg"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}