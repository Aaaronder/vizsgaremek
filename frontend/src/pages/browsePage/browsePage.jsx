import { useState, useEffect } from 'react'
import axios from 'axios'

import SongList from './components/songsList.jsx'
import NavigationBar from './components/navigationBar/navigationBar.jsx'
import SongContainer from './components/songContainer/songContainer.jsx'
import Footer from './components/footer/footer.jsx'
import Filter from './components/filter/filter.jsx'

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
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
        setFilteredSongs(songsRes.data); // Kezdetben minden zene látható
        setAlbums(albumsRes.data);
        setArtists(artistsRes.data);
        setGenres(genresRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Hiba az adatok betöltésében:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Szűrési függvény ami a Filter komponensből lesz meghívva
  const handleFilter = (filters) => {
    let result = [...songs];
  
    // Artist szűrés
    if (filters.artist) {
      result = result.filter(song => 
        song.artistId == filters.artist // == használata, mert az ID lehet string vagy number
      );
    }
  
    // Album szűrés
    if (filters.album) {
      result = result.filter(song => 
        song.albumId == filters.album
      );
    }
  
    // Műfaj szűrés
    if (filters.genre) {
      result = result.filter(song => 
        song.genreId == filters.genre
      );
    }
  
    // Keresés a SONGNAME-ben (nem title-ben!) és artistName-ben
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase().trim();
      result = result.filter(song => {
        // Előadó nevének lekérése az artists táblából
        const artist = artists.find(a => a.artistId === song.artistId);
        
        return (
          song.songName.toLowerCase().includes(term));
      });
    }
  
    setFilteredSongs(result);
  };

  return (
    <>
      <div>
        <NavigationBar></NavigationBar>
        <Filter
          artists={artists}
          albums={albums}
          genres={genres}
          onFilter={handleFilter}
        />
        <SongContainer songs={filteredSongs}></SongContainer>
      </div>
    </>
  )
}

export default App