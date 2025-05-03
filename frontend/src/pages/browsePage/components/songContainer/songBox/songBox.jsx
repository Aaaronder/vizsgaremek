import React, { useState, useEffect } from 'react';
import './songBox.css';
import axios from 'axios';
import SongPopup from '../Popup/SongPopup';

function SongBox({ song }) {

    // Állapotok definiálása
    const [showPopup, setShowPopup] = useState(false); 
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640); 
    const [imageError, setImageError] = useState(false); 
    const [albums, setAlbums] = useState([]); 
    const [artists, setArtists] = useState([]); 
    const [users, setUsers] = useState([]); 

    // Kép URL-ek definiálása
    const imageUrl = `http://localhost:3000/uploads/images/cover${song.songId}.jpg`;

    // A komponensek betöltésekor lefutó kódrészlet
    useEffect(() => {

        // Adatok lekérdezése a szerverről
        const fetchData = async () => {
            try {

                // Párhuzamos lekérdezések
                const [albumsRes, artistsRes, usersRes] = await Promise.all([
                    axios.get('http://localhost:3000/albums'),
                    axios.get('http://localhost:3000/artists'),
                    axios.get('http://localhost:3000/users')
                ]);

                // Állapotok frissítése
                setAlbums(albumsRes.data);
                setArtists(artistsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error("Hiba az adatok betöltésében:", error);
            }
        };

        fetchData();

        // Képernyőméretezés figyelése
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Segédfüggvények az adatok lekérdezéséhez
    const getAlbumName = (albumId) =>
        albums.find(album => album.albumId === albumId)?.albumName || 'Ismeretlen album';

    const getArtistName = (artistId) =>
        artists.find(artist => artist.artistId === artistId)?.artistName || 'Ismeretlen előadó';

    const getUploaderName = (songUploaderId) =>
        users.find(user => user.userId === songUploaderId)?.userName || 'Ismeretlen';

    return (
        <>
            <div 
                className="card" 
                onClick={() => setShowPopup(true)}
                style={{
                    backgroundImage: !isMobile && !imageError ? `url(${imageUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {isMobile && (
                    <div className="mobileImage">
                        <img 
                            src={!imageError ? imageUrl : placeholderImage}
                            alt={song.songName}
                            className="theImage"
                            onError={() => setImageError(true)}
                        />
                    </div>
                )}

                <div className="rest">
                    <h3 className='songName'>{song.songName}</h3>
                    <p className='artistAlbum'>{getArtistName(song.artistId)} - {getAlbumName(song.albumId)}</p>
                    <p className='uploader'>@{getUploaderName(song.songUploaderId)}</p>
                </div>
            </div>

            {showPopup && (
                <SongPopup song={song} onClose={() => setShowPopup(false)} />
            )}
        </>
    );
}

export default SongBox;