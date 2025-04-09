// components/SongPopup.jsx
import React from 'react';
import { useState, useEffect } from 'react'
import './SongPopup.css'
import axios from 'axios';  // <- Add hozzá az importot

const SongPopup = ({ song, onClose }) => {

    const [songs, setSongs] = useState([]);
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

    return (
        <div className='bigPic' onClick={onClose}>
            <div className='pop' onClick={e => e.stopPropagation()}>
                <h2 className='theSongName'>{song.songName}</h2>
                <p style={{color: 'black'}}><strong>Előadó:</strong> {getArtistName(song.artistId)}</p>
                <p style={{color: 'black'}}><strong>Album:</strong> {getAlbumName(song.albumId)}</p>
                <p style={{color: 'black'}}><strong>Genre:</strong> {getGenreName(song.genreNameId)}</p>
                <p style={{color: 'black'}}><strong>Év:</strong> {getUploaderName(song.songUploaderId)}</p>
            </div>
        </div>
    );
};

export default SongPopup;