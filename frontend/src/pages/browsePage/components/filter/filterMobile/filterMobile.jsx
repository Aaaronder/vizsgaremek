import './filterMobile.css';
import React, { useState, useEffect } from 'react';

const FilterDesktop = ({ artists, albums, genres, onFilter }) => {

    // Szűrő állapotok kezelése
    const [filters, setFilters] = useState({
        artist: '',    
        album: '',  
        genre: '',        
        searchTerm: ''  
    });

    // Input mezők változások kezelése
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
        <form className="phoneFilter" onSubmit={handleSubmit}>
            <div className="topPFilter">
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search by title..."
                    className="phoneSearchBar"
                    value={filters.searchTerm}
                    onChange={handleChange}
                />
            </div>
            <div className="bottomPFilter">
                <select
                    name="genre"
                    value={filters.genre}
                    onChange={handleChange}
                    className="filter-select-phone"
                >
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre.genreId} value={genre.genreId}>
                            {genre.genreName}
                        </option>
                    ))}
                </select>

                <select
                    name="artist"
                    value={filters.artist}
                    onChange={handleChange}
                    className="filter-select-phone"
                >
                    <option value="">All Artists</option>
                    {artists.map(artist => (
                        <option key={artist.artistId} value={artist.artistId}>
                            {artist.artistName}
                        </option>
                    ))}
                </select>

                <select
                    name="album"
                    value={filters.album}
                    onChange={handleChange}
                    className="filter-select-phone"
                >
                    <option value="">All Albums</option>
                    {albums.map(album => (
                        <option key={album.albumId} value={album.albumId}>
                            {album.albumName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="bottomButton">
                <button className='filterButtonThing' type='submit'>
                    Apply Filters
                </button>
            </div>
        </form>
    );
};

export default FilterDesktop;