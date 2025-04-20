import React, { useState, useEffect } from 'react';
import './songBox.css';
import axios from 'axios';
import SongPopup from '../Popup/SongPopup';

function SongBox({ song }) {
    const [showPopup, setShowPopup] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const [imageError, setImageError] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [users, setUsers] = useState([]);

    // Kép URL-je (ideiglenes helyettesítő, ha nincs)
    const imageUrl = `http://localhost:3000/uploads/images/cover${song.songId}.jpg`;
    const placeholderImage = "https://assets.exclaim.ca/image/upload/v1704036709/albumcovers.jpg";

    // Adatok betöltése
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [albumsRes, artistsRes, usersRes] = await Promise.all([
                    axios.get('http://localhost:3000/albums'),
                    axios.get('http://localhost:3000/artists'),
                    axios.get('http://localhost:3000/users')
                ]);
                setAlbums(albumsRes.data);
                setArtists(artistsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error("Hiba az adatok betöltésében:", error);
            }
        };

        fetchData();

        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Segédfüggvények
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
                            src={!imageError ? imageUrl : imageUrl} 
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