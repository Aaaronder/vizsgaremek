import { useState, useEffect } from 'react';
import './uploadContainer.css';
import axios from 'axios';

import leaf1 from '../../../../assets/images/ChatGPT Image Apr 12, 2025, 07_56_03 PM.png';
import leaf2 from '../../../../assets/images/ChatGPT Image Apr 12, 2025, 07_54_39 PM.png';
import tile1 from '../../../../assets/images/Logo.png';

function UploadContainer() { // Komponens neve nagybetűvel
    const [genres, setGenres] = useState([]);
    const [formData, setFormData] = useState({
        genre: '',
    });
    const [songFile, setSongFile] = useState(null); // file2
    const [imageFile, setImageFile] = useState(null); // file1
    const [isLoading, setIsLoading] = useState(true);
    const [uploadStatus, setUploadStatus] = useState(null);

    // Műfajok betöltése
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:3000/genres');
                setGenres(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching genres:', error);
                setUploadStatus({ error: 'Failed to load genres' });
                setIsLoading(false);
            }
        };

        fetchGenres();
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
        if (fileType === 'image') {
            setImageFile(file);
        } else if (fileType === 'song') {
            setSongFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!songFile || !imageFile) {
            setUploadStatus({ error: 'Both song and image files are required' });
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('songName', formData.songName);
            formDataToSend.append('artistName', formData.artistName);
            formDataToSend.append('albumName', formData.albumName);
            formDataToSend.append('genreId', formData.genre);
            formDataToSend.append('songFile', songFile);
            formDataToSend.append('songImage', imageFile);

            const response = await axios.post('http://localhost:3000/songs', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadStatus({ success: 'Song uploaded successfully!' });
            // Form reset
            setFormData({
                songName: '',
                artistName: '',
                albumName: '',
                genre: '',
            });
            setSongFile(null);
            setImageFile(null);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus({ error: error.response?.data?.message || 'Upload failed' });
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
                        <label htmlFor="artistName">ARTIST NAME</label>
                        <input className='inputsama'
                            type="text"
                            id="artistName"
                            name="artistName"
                            value={formData.artistName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="albumName">ALBUM NAME (optional)</label>
                        <input className='inputsama'
                            type="text"
                            id="albumName"
                            name="albumName"
                            value={formData.albumName}
                            onChange={handleInputChange}
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
                        <label htmlFor="songImage">SONG IMAGE <p className='max5'>max. 5mb</p></label>
                        <input className='uploadFile'
                            type="file"
                            id="songImage"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'image')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="songFile">MP3 FILE OF THE SONG</label>
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