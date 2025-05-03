import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../../mainComp/navigationBar/navigationBar.jsx';
import SongContainer from './components/songContainer/songContainer.jsx';
import Filter from './components/filter/filter.jsx';
import SignOutButton from '../../mainComp/signout/signout.jsx'
import './browsePage.css';

function BrowsePage() {
  const navigate = useNavigate();

  // Állapotok definiálása
  const [songs, setSongs] = useState([]); 
  const [filteredSongs, setFilteredSongs] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [albums, setAlbums] = useState([]); 
  const [artists, setArtists] = useState([]); 
  const [genres, setGenres] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null);

  // A komponensek betöltésekor lefutó kódrészlet
  useEffect(() => {

    // Token ellenőrzése
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Adatok lekérdezése a szerverről
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Párhuzamos lekérdezések
        const [songsRes, albumsRes, artistsRes, genresRes] = await Promise.all([
          axios.get('http://localhost:3000/songs', config),
          axios.get('http://localhost:3000/albums', config),
          axios.get('http://localhost:3000/artists', config),
          axios.get('http://localhost:3000/genres', config)
        ]);

        // Állapotok frissítése
        setSongs(songsRes.data);
        setFilteredSongs(songsRes.data);
        setAlbums(albumsRes.data);
        setArtists(artistsRes.data);
        setGenres(genresRes.data);
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
      } catch (error) {
        // 401-es hiba esetén a felhasználó kijelentkeztetése
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

  // Szűrő függvény
  const handleFilter = (filters) => {
    let result = [...songs];

    // Előadók szerinti szűrés
    if (filters.artist && artists.length) {
      result = result.filter(song => song.artistId == filters.artist);
    }

    // Albumok szerinti szűrés
    if (filters.album && albums.length) {
      result = result.filter(song => song.albumId == filters.album);
    }

    // Műfajok szerinti szűrés
    if (filters.genre && genres.length) {
      result = result.filter(song => song.genreId == filters.genre);
    }

    // Keresés a szám, vagy előadó neve alapján
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase().trim();
      result = result.filter(song =>
        song.songName.toLowerCase().includes(term) ||
        (artists.find(a => a.artistId === song.artistId)?.artistName.toLowerCase().includes(term)
        ));
    }

    // Szűrt eredmény megjelenítése
    setFilteredSongs(result);
  };

  // Betöltés vagy hiba esetén megjelenítendő elemek
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <SignOutButton></SignOutButton>
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
            <div className="no-results">There are no results matching the applied filters.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default BrowsePage;