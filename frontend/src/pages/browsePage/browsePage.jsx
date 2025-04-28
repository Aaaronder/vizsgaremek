import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './components/navigationBar/navigationBar.jsx';
import SongContainer from './components/songContainer/songContainer.jsx';
import Filter from './components/filter/filter.jsx';
import Footer from './components/footer/footer.jsx';
import './browsePage.css';

function BrowsePage() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const [songsRes, albumsRes, artistsRes, genresRes] = await Promise.all([
          axios.get('http://localhost:3000/songs', config),
          axios.get('http://localhost:3000/albums', config),
          axios.get('http://localhost:3000/artists', config),
          axios.get('http://localhost:3000/genres', config)
        ]);

        setSongs(songsRes.data);
        setFilteredSongs(songsRes.data);
        setAlbums(albumsRes.data);
        setArtists(artistsRes.data);
        setGenres(genresRes.data);
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/signin');
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleFilter = (filters) => {
    let result = [...songs];
  
    if (filters.artist && artists.length) {
      result = result.filter(song => song.artistId == filters.artist);
    }
  
    if (filters.album && albums.length) {
      result = result.filter(song => song.albumId == filters.album);
    }
  
    if (filters.genre && genres.length) {
      result = result.filter(song => song.genreId == filters.genre);
    }
  
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase().trim();
      result = result.filter(song => 
        song.songName.toLowerCase().includes(term) ||
        (artists.find(a => a.artistId === song.artistId)?.artistName.toLowerCase().includes(term)
      ));
    }
  
    setFilteredSongs(result);
  };

  if (loading) return <div className="loading">Betöltés...</div>;
  if (error) return <div className="error">Hiba: {error}</div>;

  return (
    <div className="browse-page">
      <NavigationBar currentUser={currentUser} />
      <div className="main-content">
        <Filter 
          artists={artists}
          albums={albums}
          genres={genres}
          onFilter={handleFilter}
        />
        {filteredSongs.length > 0 ? (
          <SongContainer songs={filteredSongs} />
        ) : (
          <div className="no-results">Nincs találat a szűrési feltételeknek megfelelően</div>
        )}
      </div>
    </div>
  );
}

export default BrowsePage;