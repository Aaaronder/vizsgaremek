import React from 'react';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './songBox.css'
import axios from 'axios'
import cover1 from '../../../assets/images/albumCovers/1.png'
import cover2 from '../../../assets/images/albumCovers/2.png'
import cover3 from '../../../assets/images/albumCovers/3.png'
import cover4 from '../../../assets/images/albumCovers/4.png'
import cover5 from '../../../assets/images/albumCovers/5.png'

function SongBox({ song }) {

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const images = [
        { id: 1, title: "cover1", url: cover1 },
        { id: 2, title: "cover2", url: cover2 },
        { id: 3, title: "cover3", url: cover3 },
        { id: 4, title: "cover4", url: cover4 },
        { id: 5, title: "cover5", url: cover5 },
    ];

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
            } finally {
                setLoading(false);
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

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="card">
            <div className="mobileImage">
                <img className='nigga' src="../../../assets/images/kingvon.jfif" alt="" />
            </div>
            <div className="rest">
                <h3 className='songName'>{song.songName}</h3>
                <p className='artistAlbum'>{getArtistName(song.artistId)} - {getAlbumName(song.albumId)}</p>
                <p className='uploader'>@{getUploaderName(song.songUploaderId)}</p>
            </div>
        </div>
    );
}

export default SongBox;