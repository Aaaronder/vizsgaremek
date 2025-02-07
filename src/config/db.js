import mysql from 'mysql2/promise'; 
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

export async function getUser(id) {
    let sql = 'SELECT * FROM users WHERE userId = ?';
    const [result] = await dbConnection.execute(sql, [id]);
    return result;
}

export async function insertUser(user) {
    let sql = 'INSERT INTO users (userId, userName, userEmail, userPassword, userPp, userCreated) VALUES (NULL, ?, ?, ?, ?, ?)';
    const [result] = await dbConnection.execute(sql, [user.userName, user.Email, user.Password, user.Pp, user.Created]);
    return result;
};

export async function loginUser(user) {
    let sql = 'SELECT * FROM users WHERE userName = ? AND userPassword = ?';
    const [result] = await dbConnection.execute(sql, [user.userName, user.userPassword]);
    return result;
};

export async function uploadSong(song) {
    let sql = 'INSERT INTO songs (songId, songName, songArtist, songAlbum, songGenre, songInstrument, songPath, songImage, songUploaderId, songUploadedAt) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await dbConnection.execute(sql, [song.songName, song.songArtist, song.songAlbum, song.songGenre, song.songInstrument, song.songPath, song.songImage, song.songUploaderId, song.songUploadedAt]);
    return result;
}

export async function downloadSong(songId) {
    let sql = 'SELECT songPath FROM songs WHERE songId = ?';
    const [result] = await dbConnection.execute(sql, [songId]);
    return result;
};