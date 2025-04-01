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
        const [songsRes, albumsRes, artistsRes, genresRes, usersRes] = await Promise.all([
          axios.get('http://localhost:3000/songs'),
          axios.get('http://localhost:3000/albums'),
          axios.get('http://localhost:3000/artists'),
          axios.get('http://localhost:3000/genres'),
          axios.get('http://localhost:3000/users'),
        ]);

        setSongs(songsRes.data);
        setAlbums(albumsRes.data);
        setArtists(artistsRes.data);
        setGenres(genresRes.data);
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
    albums.find(album => album.albumId === albumId)?.albumName || 'Unknown album';

  const getArtistName = (artistId) => 
    artists.find(artist => artist.artistId === artistId)?.artistName || 'Unknown artist';

  const getGenreName = (genreId) => 
    genres.find(genre => genre.genreId === genreId)?.genreName || 'Unknown genre';

  const getUploaderName = (songUploaderId) => 
    users.find(user => user.userId === songUploaderId)?.userName || 'Unknown user';

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="song-table">
      <table>
        <thead>
          <tr>
            <th>Cím</th>
            <th>Előadó</th>
            <th>Album</th>
            <th>Műfaj</th>
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