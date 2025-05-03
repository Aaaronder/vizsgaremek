// Modúlok importálása
import express from 'express';
import pool from '../config/db.js';

// Express router az útvonalak kezelésére
const router = express.Router();

// Összes album lekérése
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM albums');
    res.status(200).json(rows);
});

// Egy adott album lekérése
router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM albums WHERE albumId = ?', [req.params.id]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Az album nem található' });
    }
    res.status(200).json(rows[0]);
});

// Új album hozzáadása
router.post('/', async (req, res) => {
    const { albumName, artistId } = req.body;
    const [result] = await pool.query('INSERT INTO albums (albumName, artistId) VALUES (?, ?)', [albumName, artistId]);
    res.json({ albumId: result.insertId, albumName });
});

// Album módosítása
router.put('/:id', async (req, res) => {
    const { albumName, artistId } = req.body;
    if (!albumName || !artistId) {
        return res.status(400).json({ message: 'Album név és előadó ID szükséges' });
    }
    const [result] = await pool.query('UPDATE albums SET albumName = ?, artistId = ? WHERE albumId = ?', [albumName, artistId, req.params.id]);
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Album nem található' });
    }
    res.status(200).json({ albumId: req.params.id, albumName });
});

// Album törlése
router.delete('/:id', async (req, res) => {
    const [result] = await pool.query('DELETE FROM albums WHERE albumId = ?', [req.params.id]);
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Album nem található' });
    }
    res.status(200).json({ message: 'Album törölve' });
});

// Router exportálása
export default router;