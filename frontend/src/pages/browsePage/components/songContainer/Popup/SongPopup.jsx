// components/SongPopup.jsx
import React from 'react';
import { useState, useEffect } from 'react'
import './SongPopup.css'
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { hu, enUS } from 'date-fns/locale'; // magyar lokalizációhoz

import images1 from '../../../../../assets/images/placeholder.png'
import tile from '../../../../../assets/images/Logo.png'

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
                    <img className='thimage' src={images1} alt="" />
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