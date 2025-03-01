import express from 'express';
import pool from '../db/pool.mjs';

const router = express.Router();

// osszes eloado lekerese
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM artists');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Egy adott eloado lekerese
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM artists WHERE artistId = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Eloado nem talalhato' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// uj eloado hozzaadasa
router.post('/', async (req, res) => {
    try {
        const { artistName } = req.body;
        const [result] = await pool.query('INSERT INTO artists (artistName) VALUES (?)', [artistName]);
        res.json({ artistId: result.insertId, artistName });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eloado modositasa
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

// Eloado torlese
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM artists WHERE artistId = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Eloado nem talalhato' });
        res.json({ message: 'Eloado torolve' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
// Az eloadok kezelesere szolgalo vegpontokat tartalmazo fajl