import React from 'react';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './songBox.css'
import axios from 'axios'
import SongPopup from '../Popup/SongPopup';

function SongBox({ song }) {

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [users, setUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

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
        <>
            <div className="card" onClick={() => setShowPopup(true)}>
                <div className="mobileImage">
                    <img className='theImage' src="../../../assets/images/kingvon.jfif" alt="" />
                </div>
                <div className="rest">
                    <h3 className='songName'>{song.songName}</h3>
                    <p className='artistAlbum'>{getArtistName(song.artistId)} - {getAlbumName(song.albumId)}</p>
                    <p className='uploader'>@{getUploaderName(song.songUploaderId)}</p>
                </div>
            </div>

            {showPopup && (
                <SongPopup
                    song={song}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </>
    );
}

export default SongBox;