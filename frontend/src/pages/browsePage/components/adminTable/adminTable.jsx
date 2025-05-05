import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adminTable.css'

function AdminTable() {
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [users, setUsers] = useState([]);

    // Adatok lekérése a végpontokról
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                // Token ellenőrzése
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('Nincs token, átirányítás a bejelentkezésre');
                    navigate('/signin');
                    return;
                }

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                };

                const [albumsRes, artistsRes, genresRes, usersRes, songsRes] = await Promise.all([
                    axios.get('http://localhost:3000/albums', config),
                    axios.get('http://localhost:3000/artists', config),
                    axios.get('http://localhost:3000/genres', config),
                    axios.get('http://localhost:3000/users', config),
                    axios.get('http://localhost:3000/songs', config),
                ]);

                // Állapotok frissítése
                setAlbums(albumsRes.data);
                setArtists(artistsRes.data);
                setGenres(genresRes.data);
                setUsers(usersRes.data);
                setData(songsRes.data);
                setLoading(false);
            } catch (err) {
                console.error('Hiba a kérés során:', err);
                if (err.response?.status === 401) {
                    console.log('401-es hiba, token törlése és átirányítás');
                    localStorage.removeItem('token');
                    navigate('/signin');
                } else if (err.code === 'ERR_NETWORK') {
                    setError('Hálózati hiba: Ellenőrizd a CORS beállításokat a backend-en, vagy hogy a szerver válaszol-e a http://localhost:3000/songs címen');
                } else {
                    setError(err.response?.data?.message || err.message || 'Hiba az adatok lekérésekor');
                }
                setLoading(false);
            }
        };
        fetchSongs();
    }, [navigate]);

    // Szerkesztés gomb kezelése
    const handleEdit = (item) => {
        setEditData({
            songId: item.songId,
            songName: item.songName,
            artistName: getArtistName(item.artistId),
            albumName: item.albumId ? getAlbumName(item.albumId) : '',
            genreName: getGenreName(item.genreId),
            artistId: item.artistId,
            albumId: item.albumId,
            genreId: item.genreId,
            songUploaderId: item.songUploaderId,
        });
        setError(null);
        setSuccessMessage(null);
    };

    // Űrlap küldése (adatbázis frissítése)
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Nincs token, átirányítás a bejelentkezésre');
            navigate('/signin');
            return;
        }

        // Érvénytelen ID-k ellenőrzése
        if (!artists.some(a => a.artistId === editData.artistId)) {
            setError('Érvénytelen előadó: Kérlek, válassz létező előadót');
            return;
        }
        if (!genres.some(g => g.genreId === editData.genreId)) {
            setError('Érvénytelen műfaj: Kérlek, válassz létező műfajt');
            return;
        }
        if (editData.albumId && !albums.some(a => a.albumId === editData.albumId)) {
            setError('Érvénytelen album: Kérlek, válassz létező albumot vagy hagyd üresen');
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        // Az ID-kat használjuk a PATCH kéréshez
        const patchData = {
            songName: editData.songName,
            artistId: parseInt(editData.artistId),
            albumId: editData.albumId ? parseInt(editData.albumId) : null,
            genreId: parseInt(editData.genreId),
        };

        console.log('PATCH kérés küldése:', `http://localhost:3000/songs/${editData.songId}`, patchData);
        const response = await axios.patch(`http://localhost:3000/songs/${editData.songId}`, patchData, config);
        console.log('PATCH válasz:', response.data);

        // Adatok újratöltése
        const fetchSongs = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log('Nincs token, átirányítás a bejelentkezésre');
                    navigate('/signin');
                    return;
                }

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                };

                const [albumsRes, artistsRes, genresRes, usersRes, songsRes] = await Promise.all([
                    axios.get('http://localhost:3000/albums', config),
                    axios.get('http://localhost:3000/artists', config),
                    axios.get('http://localhost:3000/genres', config),
                    axios.get('http://localhost:3000/users', config),
                    axios.get('http://localhost:3000/songs', config),
                ]);

                setAlbums(albumsRes.data);
                setArtists(artistsRes.data);
                setGenres(genresRes.data);
                setUsers(usersRes.data);
                setData(songsRes.data);
            } catch (err) {
                console.error('Hiba az adatok újratöltésekor:', err);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/signin');
                }
            }
        };

        await fetchSongs(); // Adatok újratöltése

        setSuccessMessage('Song updated successfully');
        setEditData(null);
        setError(null);
    } catch (err) {
        console.error('Hiba a PATCH kérés során:', {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
            config: err.config,
        });
        if (err.response?.status === 401) {
            console.log('401-es hiba, token törlése és átirányítás');
            localStorage.removeItem('token');
            navigate('/signin');
        } else if (err.response?.status === 404) {
            setError('A dal nem található: Ellenőrizd, hogy a songId érvényes-e');
        } else if (err.response?.status === 400) {
            setError('Hibás kérés: Ellenőrizd az adatokat (pl. érvénytelen ID-k)');
        } else if (err.code === 'ERR_NETWORK') {
            setError('Hálózati hiba: Ellenőrizd, hogy a szerver fut-e, és a CORS beállítások megfelelőek-e');
        } else {
            setError(err.response?.data?.message || err.message || 'Hiba az adatok frissítésekor');
        }
        setSuccessMessage(null);
    }
};

    // Törlés gomb kezelése
    const handleDelete = async (songId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('Nincs token, átirányítás a bejelentkezésre');
                navigate('/signin');
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            };

            console.log('DELETE kérés küldése:', `http://localhost:3000/songs/${songId}`);
            await axios.delete(`http://localhost:3000/songs/${songId}`, config);
            console.log('DELETE sikeres');

            setData(data.filter(item => item.songId !== songId));
            if (editData && editData.songId === songId) {
                setEditData(null);
            }
            setError(null);
            setSuccessMessage('Song deleted successfully');
        } catch (err) {
            console.error('Hiba a DELETE kérés során:', err);
            if (err.response?.status === 401) {
                console.log('401-es hiba, token törlése és átirányítás');
                localStorage.removeItem('token');
                navigate('/signin');
            } else {
                setError(err.response?.data?.message || err.message || 'Hiba az adat törlésekor');
                setSuccessMessage(null);
            }
        }
    };

    // Űrlap mezők változásának kezelése
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...editData, [name]: value };

        // ID-k frissítése a legördülő menük alapján
        if (name === 'artistId') {
            const artist = artists.find(a => a.artistId === parseInt(value));
            updatedData.artistId = artist ? artist.artistId : editData.artistId;
            updatedData.artistName = artist ? artist.artistName : editData.artistName;
        } else if (name === 'albumId') {
            if (value === '') {
                updatedData.albumId = null;
                updatedData.albumName = '';
            } else {
                const album = albums.find(a => a.albumId === parseInt(value));
                updatedData.albumId = album ? album.albumId : editData.albumId;
                updatedData.albumName = album ? album.albumName : editData.albumName;
            }
        } else if (name === 'genreId') {
            const genre = genres.find(g => g.genreId === parseInt(value));
            updatedData.genreId = genre ? genre.genreId : editData.genreId;
            updatedData.genreName = genre ? genre.genreName : editData.genreName;
        }

        setEditData(updatedData);
    };

    // Segédfüggvények az adatok lekéréséhez
    const getAlbumName = (albumId) =>
        albums.find(album => album.albumId === albumId)?.albumName || 'Unknown album';

    const getArtistName = (artistId) =>
        artists.find(artist => artist.artistId === artistId)?.artistName || 'Unknown artist';

    const getGenreName = (genreId) =>
        genres.find(genre => genre.genreId === genreId)?.genreName || 'Unknown genre';

    const getUploaderName = (songUploaderId) =>
        users.find(user => user.userId === songUploaderId)?.userName || 'Unknown user';

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='adminTable'>
            {successMessage && <div className='successMessage'>{successMessage}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Song Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Genre</th>
                        <th>Uploader</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={(item.songId)}>
                            <td>{item.songName}</td>
                            <td>{getArtistName(item.artistId)}</td>
                            <td>{getAlbumName(item.albumId || '-')}</td>
                            <td>{getGenreName(item.genreId)}</td>
                            <td>{getUploaderName(item.songUploaderId)}</td>
                            <td className='buttonCol'>
                                <button className='tableButton' onClick={() => handleEdit(item)}>
                                    Edit
                                </button>
                                <button className='tableButton' onClick={() => handleDelete(item.songId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editData && (
                <div className='editForm'>
                    <h2 className='edith2'>Edit</h2>
                    <form className='edit' onSubmit={handleSubmit}>
                        <div>
                            <label>Song Title</label>
                            <input
                                type="text"
                                name="songName"
                                value={editData.songName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Artist</label>
                            <select
                                name="artistId"
                                value={editData.artistId}
                                onChange={handleInputChange}
                                required
                            >
                                {artists.map(artist => (
                                    <option key={artist.artistId} value={artist.artistId}>
                                        {artist.artistName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Album</label>
                            <select
                                name="albumId"
                                value={editData.albumId || ''}
                                onChange={handleInputChange}
                            >
                                <option value="">No Album</option>
                                {albums.map(album => (
                                    <option key={album.albumId} value={album.albumId}>
                                        {album.albumName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Genre</label>
                            <select
                                name="genreId"
                                value={editData.genreId}
                                onChange={handleInputChange}
                                required
                            >
                                {genres.map(genre => (
                                    <option key={genre.genreId} value={genre.genreId}>
                                        {genre.genreName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='editSubmit'>
                            <button type="submit">
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditData(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminTable;