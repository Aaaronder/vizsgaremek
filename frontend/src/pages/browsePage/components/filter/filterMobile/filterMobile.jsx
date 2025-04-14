import React from 'react';
import { Link } from 'react-router-dom';
import './filterMobile.css';
import { useState, useEffect } from 'react';

const FilterMobile = () => {
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
        <form className='phoneFilter' action="#">
            <div className="topPFilter">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="phoneSearchBar"
                />
            </div>
            <div className="bottomPFilter">
                <select name="genre"
                    value={filters.genre}
                    onChange={handleChange}
                    className="filter-select-phone">
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre.genreId} value={genre.genreId}>
                            {genre.genreName}
                        </option>
                    ))}
                </select>

                <select name="artist"
                    value={filters.artist}
                    onChange={handleChange}
                    className="filter-select-phone">
                    <option value="">Aritsts</option>
                    {artists.map(artist => (
                        <option key={artist.artistId} value={artist.artistId}>
                            {artist.artistName}
                        </option>
                    ))}
                </select>

                <select name="album"
                    value={filters.album}
                    onChange={handleChange}
                    className="filter-select-phone">
                    <option value="">All albums</option>
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

export default FilterMobile;