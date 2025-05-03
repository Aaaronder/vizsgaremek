import './filterDesktop.css';
import React, { useState } from 'react';

const FilterDesktop = ({ artists, albums, genres, onFilter }) => {
  
  // Szűrő állapotok kezelése
  const [filters, setFilters] = useState({
    artist: '',     
    album: '',       
    genre: '',       
    searchTerm: ''   
  });

  // Input mezők változásának kezelése
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Szűrők alkalmazása
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters); 
  };

  return (
    <form className="filterBar" onSubmit={handleSubmit}>
      <div className="searchBar">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search by title..."
          className="search-input"
          value={filters.searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="genreDD">
        <select 
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.genreId} value={genre.genreId}>
              {genre.genreName}
            </option>
          ))}
        </select>
      </div>
      <div className="artistDD">
        <select 
          name="artist"
          value={filters.artist}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">All Artists</option>
          {artists.map(artist => (
            <option key={artist.artistId} value={artist.artistId}>
              {artist.artistName}
            </option>
          ))}
        </select>
      </div>
      <div className="albumDD">
        <select 
          name="album"
          value={filters.album}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">All Albums</option>
          {albums.map(album => (
            <option key={album.albumId} value={album.albumId}>
              {album.albumName}
            </option>
          ))}
        </select>
      </div>
      <div className="searchButton">
        <button className='theButton' type='submit'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default FilterDesktop;