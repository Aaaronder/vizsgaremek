// components/SongPopup.jsx
import React from 'react';
import { useState, useEffect } from 'react'

const SongPopup = ({ song, onClose }) => {

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [users, setUsers] = useState([]);

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
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                maxWidth: '600px',
                width: '90%',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                >
                    ×
                </button>

                <h2 style={{color: 'black'}}>{song.songName}</h2>
                <p><strong>Előadó:</strong> {getArtistName(song.artistId)}</p>
                <p><strong>Album:</strong> {getAlbumName(song.albumId)}</p>
                <p><strong>Genre:</strong> {getGenreName(song.genreNameId)}</p>
                <p><strong>Év:</strong> {getUploaderName(song.songUploaderId)}</p>
            </div>
        </div>
    );
};

export default SongPopup;