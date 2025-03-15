import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Összes lejátszási lista lekérése
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM playlists');
    res.json(rows);
});

// Egy adott lejátszási lista lekérése
router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM playlists WHERE plId = ?', [req.params.id]);
    res.json(rows[0]);
});

// Új lejátszási lista hozzáadása
router.post('/', async (req, res) => {
    const { plName, plOwnerId, songId } = req.body;
    const [result] = await pool.query('INSERT INTO playlists (plName, plOwnerId, songId) VALUES (?, ?, ?)', [plName, plOwnerId, songId]);
    res.json({ plId: result.insertId, plName });
});

// Lejátszási lista módosítása
router.put('/:id', async (req, res) => {
    const { plName, plOwnerId, songId } = req.body;
    await pool.query('UPDATE playlists SET plName = ?, plOwnerId = ?, songId = ? WHERE plId = ?', [plName, plOwnerId, songId, req.params.id]);
    res.json({ plId: req.params.id, plName });
});

// Lejátszási lista törlése
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM playlists WHERE plId = ?', [req.params.id]);
    res.json({ message: 'Lejátszási lista törölve' });
});

export default router;