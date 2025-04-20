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
    const placeholderImage = "https://i.pinimg.com/736x/2b/c0/8d/2bc08d66290a5166c825feb0837d4006.jpg";

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
                        <source className='thing' src="horse.ogg" type="audio/ogg" />
                    </audio>
                </div>
                <div className="rightP">
                    <button className='downloadButton'>Download</button>
                </div>
                <img className='bgtile' src={tile} alt="" />
            </div>
            <p className='closeP'>Tap anywhere outside to close the popup.</p>
        </div>
    );
};

export default SongPopup;