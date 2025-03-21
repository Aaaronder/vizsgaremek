// Modúlok importálása
import express from 'express';
import pool from '../config/db.js';

// Express router az útvonalak kezelésére
const router = express.Router();

// Összes előadó lekérése
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM artists');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Egy adott előadó lekérése
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM artists WHERE artistId = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Eloado nem talalhato' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Új előadó hozzáadása
router.post('/', async (req, res) => {
    try {
        const { artistName } = req.body;
        const [result] = await pool.query('INSERT INTO artists (artistName) VALUES (?)', [artistName]);
        res.json({ artistId: result.insertId, artistName });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Előadó módosítása
router.put('/:id', async (req, res) => {
    try {
        const { artistName } = req.body;
        const [result] = await pool.query('UPDATE artists SET artistName = ? WHERE artistId = ?', [artistName, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Eloado nem talalhato' });
        res.json({ artistId: req.params.id, artistName });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Előadó törlése
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM artists WHERE artistId = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Eloado nem talalhato' });
        res.json({ message: 'Eloado torolve' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Router exportálása
export default router;