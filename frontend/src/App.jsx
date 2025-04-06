import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

import SongList from './components/songsList.jsx'
import NavigationBar from './components/navigationBar/navigationBar.jsx'
import SongContainer from './components/songContainer/songContainer.jsx'
import Footer from './components/footer/footer.jsx'
import Filter from './components/filter/filter.jsx'

/*

*/

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [users, setUsers] = useState([]);

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
    <>
      <div className="appocska">
        <NavigationBar></NavigationBar>
        <Filter></Filter>
        <SongContainer songs={songs}></SongContainer>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App