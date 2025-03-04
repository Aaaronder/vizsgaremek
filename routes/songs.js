import express from 'express';
import pool from '../db/pool.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM songs');
    res.json(rows);
});

router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM songs WHERE songId = ?', [req.params.id]);
    res.json(rows[0]);
});

router.post('/', async (req, res) => {
    const { songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage } = req.body;
    const [result] = await pool.query(
        'INSERT INTO songs (songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage]
    );
    res.json({ songId: result.insertId, songName });
});

router.put('/:id', async (req, res) => {
    const { songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage } = req.body;
    await pool.query(
        'UPDATE songs SET songName = ?, artistId = ?, albumId = ?, genreId = ?, songUploaderId = ?, instrumentId = ?, songPath = ?, songImage = ? WHERE songId = ?',
        [songName, artistId, albumId, genreId, songUploaderId, instrumentId, songPath, songImage, req.params.id]
    );
    res.json({ songId: req.params.id, songName });
});

router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM songs WHERE songId = ?', [req.params.id]);
    res.json({ message: 'Dal törölve' });
});

export default router;