import express from 'express';
import pool from '../db/pool.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM albums');
    res.json(rows);
});

router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM albums WHERE albumId = ?', [req.params.id]);
    res.json(rows[0]);
});

router.post('/', async (req, res) => {
    const { albumName, artistId } = req.body;
    const [result] = await pool.query('INSERT INTO albums (albumName, artistId) VALUES (?, ?)', [albumName, artistId]);
    res.json({ albumId: result.insertId, albumName });
});

router.put('/:id', async (req, res) => {
    const { albumName, artistId } = req.body;
    await pool.query('UPDATE albums SET albumName = ?, artistId = ? WHERE albumId = ?', [albumName, artistId, req.params.id]);
    res.json({ albumId: req.params.id, albumName });
});

router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM albums WHERE albumId = ?', [req.params.id]);
    res.json({ message: 'Album törölve' });
});

export default router;