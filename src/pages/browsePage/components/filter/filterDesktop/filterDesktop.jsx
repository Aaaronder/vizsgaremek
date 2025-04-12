import './filterDesktop.css';
import React, { useState, useEffect } from 'react';

const FilterDesktop = (onFilterChange) => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    artist: '',
    album: '',
    genre: ''
  });

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [artistsRes, albumsRes, genresRes] = await Promise.all([
          fetch('http://localhost:3000/artists'),
          fetch('http://localhost:3000/albums'),
          fetch('http://localhost:3000/genres')
        ]);

        const [artistsData, albumsData, genresData] = await Promise.all([
          artistsRes.json(),
          albumsRes.json(),
          genresRes.json()
        ]);

        setArtists(artistsData);
        setAlbums(albumsData);
        setGenres(genresData);
      } catch (error) {
        console.error('Error loading filter data:', error);
      }
    };

    fetchFilterData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <form className="filterBar">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search by title..."
          className="search-input"
        />
      </div>
      <div className="genreDD">
        <select name="genre"
          value={filters.genre}
          onChange={handleChange}
          className="filter-select">
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.genreId} value={genre.genreId}>
              {genre.genreName}
            </option>
          ))}
        </select>
      </div>
      <div className="artistDD">
        <select name="artist"
          value={filters.artist}
          onChange={handleChange}
          className="filter-select">
          <option value="">Aritsts</option>
          {artists.map(artist => (
            <option key={artist.artistId} value={artist.artistId}>
              {artist.artistName}
            </option>
          ))}
        </select>
      </div>
      <div className="albumDD">
        <select name="album"
          value={filters.album}
          onChange={handleChange}
          className="filter-select">
          <option value="">All albums</option>
          {albums.map(album => (
            <option key={album.albumId} value={album.albumId}>
              {album.albumName}
            </option>
          ))}
        </select>
      </div>
      <div className="searchButton">
        <button className='theButton' type='submit'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default FilterDesktop;