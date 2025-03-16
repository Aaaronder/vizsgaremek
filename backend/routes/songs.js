import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Összes dal lekérése
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM songs');
    res.json(rows);
});

// Egy adott dal lekérése
router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM outclass WHERE songId = ?', [req.params.id]);
    res.json(rows[0]);
});

// Új dal hozzáadása
router.post('/', async (req, res) => {
    const { songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage } = req.body;
    const [result] = await pool.query(
        'INSERT INTO outclass (songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage]
    );
    res.json({ songId: result.insertId, songName });
});

// Dal módosítása
router.put('/:id', async (req, res) => {
    const { songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage } = req.body;
    await pool.query(
        'UPDATE outclass SET songName = ?, artistId = ?, albumId = ?, genreId = ?, songUploaderId = ?, instrumentId = ?, songPath = ?, songImage = ? WHERE songId = ?',
        [songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage, req.params.id]
    );
    res.json({ songId: req.params.id, songName });
});

// Dal törlése
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM outclass WHERE songId = ?', [req.params.id]);
    res.json({ message: 'Dal törölve' });
});

// Zene keresése
router.get('/search', (req, res) => {
    const { artistName, genreName, albumName } = req.query;
  
    let query = 'SELECT * FROM outclass INNER JOIN artists ON outclass.artistId = artists.artistId ';
    let queryParams = [];
  
    if (artistName) {
      query += 'WHERE artists.artistName LIKE ? ';
      queryParams.push('%' + artistName + '%');
    }
  
    if (genreName) {
      query += 'AND outclass.genreId = (SELECT genreId FROM genres WHERE genreName = ?) ';
      queryParams.push(genreName);
    }
  
    if (albumName) {
      query += 'AND outclass.albumId = (SELECT albumId FROM albums WHERE albumName = ?) ';
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
  
export default router;