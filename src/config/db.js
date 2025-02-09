import mysql from 'mysql2'; // /promise
import dotenv from 'dotenv';

// Betölti a .env fájlban lévő változókat
dotenv.config(); 

// Adatbázis kapcsolat létrehozása
const dbConnection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

dbConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL server: ' + err.stack);
        return;
    }
    console.log('Connected to the MySQL server.');
});

/*export async function getUsers() {
    let sql = 'SELECT * FROM users';
    const [result] = await dbConnection.execute(sql);
    return result;
};*/

// get user from database
export async function getUser(id) {
    let sql = 'SELECT * FROM users WHERE userId = ?';
    const [result] = await dbConnection.execute(sql, [id]);
    return result;
}

// insert user into database
export async function insertUser(user) {
    let sql = 'INSERT INTO users (userId, userName, userEmail, userPassword, userPp, userCreated) VALUES (NULL, ?, ?, ?, ?, ?)';
    const [result] = await dbConnection.execute(sql, [user.userName, user.Email, user.Password, user.Pp, user.Created]);
    return result;
};

// log user in
export async function loginUser(user) {
    let sql = 'SELECT * FROM users WHERE userName = ? AND userPassword = ?';
    const [result] = await dbConnection.execute(sql, [user.userName, user.userPassword]);
    return result;
};

// insert song into database
export async function uploadSong(song) {
    let sql = 'INSERT INTO songs (songId, songName, songArtist, songAlbum, songGenre, songInstrument, songPath, songImage, songUploaderId, songUploadedAt) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await dbConnection.execute(sql, [song.songName, song.songArtist, song.songAlbum, song.songGenre, song.songInstrument, song.songPath, song.songImage, song.songUploaderId, song.songUploadedAt]);
    return result;
}

// download song
export async function downloadSong(songId) {
    let sql = 'SELECT songPath FROM songs WHERE songId = ?';
    const [result] = await dbConnection.execute(sql, [songId]);
    return result;
};

// get playlist
export async function getPlaylists() {
    let sql = 'SELECT * FROM playlists';
    const [result] = await dbConnection.execute(sql);
    return result;
};

// create playlist
export async function createPlaylist(playlist) {
    let sql = 'INSERT INTO playlists (plId, plName, plOwnerId, plCreated) VALUES (NULL, ?, ?, ?)';
    const [result] = await dbConnection.execute(sql, [playlist.plName, playlist.plOwnerId, playlist.plCreated]);
    return result;
};

// delete playlist
export async function deletePlaylist(plId) {
    let sql = 'DELETE FROM playlists WHERE plId = ?';
    const [result] = await dbConnection.execute(sql, [plId]);
    return result;
};

// add song to playlist
export async function addToPlaylist(plId, songId) {
    let sql = 'INSERT INTO plsongs (plId, songId, addedAt) VALUES (?, ?, NOW())';
    const [result] = await dbConnection.execute(sql, [plId, songId]);
    return result;
};

// remove song from playlist
export async function removeFromPlaylist(plId, songId) {
    let sql = 'DELETE FROM plsongs WHERE plId = ? AND songId = ?';
    const [result] = await dbConnection.execute(sql, [plId, songId]);
    return result;
};

export default dbConnection;

/*export async function browseSongs(filters) {
    let sql = 'SELECT * FROM songs WHERE songName LIKE ? OR songGenre = ? OR songInstrument = ? OR songArtist = ?';
    const [result] = await dbConnection.execute(sql, [`%${filters.search}%`, filters.genre, filters.instrument, filters.artist]);
    return result;
};*/