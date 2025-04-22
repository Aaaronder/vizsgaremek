import React, { useState, useEffect } from 'react';
import './SongPopup.css';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

import tile from '../../../../../assets/images/Logo.png'

const SongPopup = ({ song, onClose }) => {
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [users, setUsers] = useState([]);
    const [imageError, setImageError] = useState(false);

    // Kép URL-je a backendről
    const imageUrl = `http://localhost:3000/uploads/images/cover${song.songId}.jpg`;
    const audioUrl = `http://localhost:3000${song.songPath}`;

    // Adatok betöltése
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [albumsRes, artistsRes, genresRes, usersRes] = await Promise.all([
                    axios.get('http://localhost:3000/albums'),
                    axios.get('http://localhost:3000/artists'),
                    axios.get('http://localhost:3000/genres'),
                    axios.get('http://localhost:3000/users'),
                ]);

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

    // Relatív idő formázása
    const formatUploadTime = (timestamp) => {
        try {
            const date = new Date(timestamp);
            return formatDistanceToNow(date, {
                addSuffix: true,
                locale: enUS
            });
        } catch (error) {
            console.error("Error:", error);
            return timestamp;
        }
    };

    const handleDownload = async () => {
        try {
            // 1. Letöltési URL összeállítása
            const downloadUrl = `http://localhost:3000/songs/download/${song.songId}`;

            // 2. Fetch hívás a letöltéshez
            const response = await fetch(downloadUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 3. Blob létrehozása és letöltés
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${song.songName} - ${getArtistName(song.artistId)}.mp3`; // Fájlnév
            link.click();

            // 4. Memóriafelszabadítás
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Letöltési hiba:", error);
            alert("A letöltés sikertelen. Próbáld újra!");
        }
    };

    return (
        <div className='bigPic' onClick={onClose}>
            <div className='pop' onClick={e => e.stopPropagation()}>
                <div className="leftP">
                    <img
                        className='thimage'
                        src={imageUrl}
                        alt={song.songName}
                        onError={() => setImageError(true)}
                    />
                </div>
                <div className="centerP">
                    <h2 className='theSongName'>{song.songName}</h2>
                    <p className='popupP'><strong>Artist:</strong> {getArtistName(song.artistId)}</p>
                    <p className='popupP'><strong>Album:</strong> {getAlbumName(song.albumId)}</p>
                    <p className='popupP'><strong>Genre:</strong> {getGenreName(song.genreId)}</p>
                    <p className='popupP'><strong>Uploader:</strong> {getUploaderName(song.songUploaderId)}</p>
                    <p className='popupP' id='floatright'>Uploaded: {formatUploadTime(song.songUploadedAt)}</p>
                    <audio controls className='thing'>
                        <source className='thing' src={audioUrl} type="audio/ogg" />
                    </audio>
                </div>
                <div className="rightP">
                    <button onClick={handleDownload} className='downloadButton'>Download</button>
                </div>
                <img className='bgtile' src={tile} alt="" />
            </div>
            <p className='closeP'>Tap anywhere outside to close the popup.</p>
        </div>
    );
};

export default SongPopup;