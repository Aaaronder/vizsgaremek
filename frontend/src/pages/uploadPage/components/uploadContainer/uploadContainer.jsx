import { useState, useEffect } from 'react';
import './uploadContainer.css';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';

import leaf1 from '../../../../assets/images/ChatGPT Image Apr 12, 2025, 07_56_03 PM.png';
import leaf2 from '../../../../assets/images/ChatGPT Image Apr 12, 2025, 07_54_39 PM.png';
import tile1 from '../../../../assets/images/Logo.png';

function UploadContainer() {
    const [genres, setGenres] = useState([]);
    const [songFile, setSongFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [formData, setFormData] = useState({
        songName: '',
        artistId: '',
        artistName: '',
        albumId: '',
        albumName: '',
        genre: ''
    });
    const { user } = useContext(UserContext);

    // Műfajok betöltése
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [genresRes, artistsRes, albumsRes] = await Promise.all([
                    axios.get('http://localhost:3000/genres'),
                    axios.get('http://localhost:3000/artists'),
                    axios.get('http://localhost:3000/albums'),
                ]);
                setGenres(genresRes.data);
                setArtists(artistsRes.data);
                setAlbums(albumsRes.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setUploadStatus({ error: 'Nem sikerült betölteni az űrlap opciókat' });
                setTimeout(() => setUploadStatus(null), 5000); // 5 másodperc múlva törli az üzenetet
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (fileType === 'image' && file && file.type !== 'image/jpeg') {
            setUploadStatus({ error: 'Please note that we only accept JPG files.' });
            setTimeout(() => setUploadStatus(null), 5000); // 5 másodperc múlva törli az üzenetet
            return;
        } else if (fileType === 'song' && file && file.type !== 'audio/mpeg') {
            setUploadStatus({ error: 'Please note that we only accept MP3 files.' });
            setTimeout(() => setUploadStatus(null), 5000); // 5 másodperc múlva törli az üzenetet
            return;
        }
        if (fileType === 'image') {
            setImageFile(file);
        } else if (fileType === 'song') {
            setSongFile(file);
        }
        setUploadStatus(null); // Töröljük a korábbi hibaüzenetet, ha érvényes fájlt választottak
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!songFile || !imageFile) {
            setUploadStatus({ error: 'The cover image and/or the music file (mp3) is missing.' });
            setTimeout(() => setUploadStatus(null), 5000); // 5 másodperc múlva törli az üzenetet
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('songName', formData.songName);
            formDataToSend.append('artistId', formData.artistId);
            formDataToSend.append('artistName', formData.artistName);
            formDataToSend.append('albumId', formData.albumId);
            formDataToSend.append('albumName', formData.albumName);
            formDataToSend.append('genreId', formData.genre);
            formDataToSend.append('songFile', songFile);
            formDataToSend.append('songImage', imageFile);
            formDataToSend.append('userId', user.userId);

            const response = await axios.post('http://localhost:3000/songs', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadStatus({ success: 'Song successfully uploaded.' });
            setTimeout(() => setUploadStatus(null), 5000); // 5 másodperc múlva törli a sikeres üzenetet
            // Form reset
            setFormData({
                songName: '',
                artistName: '',
                albumName: '',
                genre: '',
            });
            setSongFile(null);
            setImageFile(null);

            // Reset file input fields
            document.getElementById('songFile').value = '';
            document.getElementById('songImage').value = '';

        } catch (error) {
            console.error('Feltöltési hiba:', error);
            const errorMessage = error.response?.data?.message || 'The upload was unsuccessfull.';
            setUploadStatus({ error: errorMessage });
            setTimeout(() => setUploadStatus(null), 5000); // 5 másodperc múlva törli az üzenetet
        }
    };

    if (isLoading) return <div>Loading genres...</div>;

    return (
        <>
            <div className="backgroundBox"></div>

            <form className="sUploadContainer" onSubmit={handleSubmit}>
                <h2 className='bigahhtext'>Upload Your Song</h2>
                <img className='leaf1' src={leaf1} alt="" />
                <img className='leaf2' src={leaf2} alt="" />
                <img className='leaf3' src={leaf2} alt="" />
                <img className='tile1' src={tile1} alt="" />

                <div className="formLeft">
                    <div className="form-group">
                        <label htmlFor="songName">SONG TITLE</label>
                        <input className='inputsama'
                            type="text"
                            id="songName"
                            name="songName"
                            value={formData.songName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>SELECT EXISTING ARTIST</label>
                        <select
                            className='inputsama'
                            name="artistId"
                            value={formData.artistId}
                            onChange={handleInputChange}
                        >
                            <option value="">-- Select existing artist --</option>
                            {artists.map(artist => (
                                <option key={artist.artistId} value={artist.artistId}>
                                    {artist.artistName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>SELECT EXISTING ALBUM</label>
                        <select
                            className='inputsama'
                            name="albumId"
                            value={formData.albumId}
                            onChange={handleInputChange}
                        >
                            <option value="">-- Select existing album --</option>
                            {albums.map(album => (
                                <option key={album.albumId} value={album.albumId}>
                                    {album.albumName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="songImage">SONG IMAGE <p className='max5'>max. 5mb, jpg only!</p></label>
                        <input className='uploadFile'
                            type="file"
                            id="songImage"
                            accept="image/jpeg"
                            onChange={(e) => handleFileChange(e, 'image')}
                            required
                        />
                    </div>
                </div>

                <div className="formRight">
                    <div className="form-group">
                        <label htmlFor="genre">GENRE</label>
                        <select className='inputsama'
                            id="genre"
                            name="genre"
                            value={formData.genre}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a genre</option>
                            {genres.map((genre) => (
                                <option key={genre.genreId} value={genre.genreId}>
                                    {genre.genreName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>OR CREATE NEW ARTIST</label>
                        <input
                            className='inputsama'
                            type="text"
                            name="artistName"
                            value={formData.artistName}
                            onChange={handleInputChange}
                            placeholder="New artist name"
                        />
                    </div>

                    <div className="form-group">
                        <label>OR CREATE NEW ALBUM</label>
                        <input
                            className='inputsama'
                            type="text"
                            name="albumName"
                            value={formData.albumName}
                            onChange={handleInputChange}
                            placeholder="New album name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="songFile">SONG FILE <p className='max5'>mp3 only!</p></label>
                        <input className='uploadFile'
                            type="file"
                            id="songFile"
                            accept="audio/mp3"
                            onChange={(e) => handleFileChange(e, 'song')}
                            required
                        />
                    </div>
                </div>

                <button className='bigahhbutton' type="submit">
                    UPLOAD SONG
                </button>
            </form>
            {uploadStatus?.error && (
                <div className="error-message">{uploadStatus.error}</div>
            )}
            {uploadStatus?.success && (
                <div className="success-message">{uploadStatus.success}</div>
            )}
        </>
    );
}

export default UploadContainer;