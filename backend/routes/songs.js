// Modúlok importálása
import express from 'express';
import pool from '../config/db.js';

// Express router az útvonalak kezelésére
const router = express.Router();

// Összes zene lekérése
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM songs');
    res.json(rows);
});

// Egy adott zene lekérése
router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM songs WHERE songId = ?', [req.params.id]);
    res.json(rows[0]);
});

// Új zene hozzáadása
router.post('/', async (req, res) => {
    const { songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage } = req.body;
    const [result] = await pool.query(
        'INSERT INTO songs (songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage]
    );
    res.json({ songId: result.insertId, songName });
});

// Zene módosítása
router.put('/:id', async (req, res) => {
    const { songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage } = req.body;
    await pool.query(
        'UPDATE songs SET songName = ?, artistId = ?, albumId = ?, genreId = ?, songUploaderId = ?, instrumentId = ?, songPath = ?, songImage = ? WHERE songId = ?',
        [songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage, req.params.id]
    );
    res.json({ songId: req.params.id, songName });
});

// Zene törlése
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM songs WHERE songId = ?', [req.params.id]);
    res.json({ message: 'Dal törölve' });
});

// Zene keresése ??
router.get('/search', (req, res) => {
  const { artistName, genreName, albumName } = req.query;

  let query = 'SELECT * FROM songs INNER JOIN artists ON songs.artistId = artists.artistId ';
  let queryParams = [];

  if (artistName) {
    query += 'WHERE artists.artistName LIKE ? ';
    queryParams.push('%' + artistName + '%');
  }

  if (genreName) {
    query += 'AND songs.genreId = (SELECT genreId FROM genres WHERE genreName = ?) ';
    queryParams.push(genreName);
  }

  if (albumName) {
    query += 'AND songs.albumId = (SELECT albumId FROM albums WHERE albumName = ?) ';
    queryParams.push(albumName);
  }

  pool.query(query, queryParams, (err, result) => {
    if (err) {
      console.error('Error searching songs:', err);
      return res.status(500).json({ error: 'Failed to search songs' });
    }
    res.status(200).json({ songs: result });
  });
});

// Router exportálása
export default router;