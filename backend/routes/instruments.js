// Modúlok importálása
import express from 'express';
import pool from '../config/db.js';

// Express router az útvonalak kezelésére
const router = express.Router();

// Összes hangszer lekérése
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM instruments');
    res.json(rows);
});

// Egy adott hangszer lekérése
router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM instruments WHERE instrumentId = ?', [req.params.id]);
    res.json(rows[0]);
});

// Új hangszer hozzáadása
router.post('/', async (req, res) => {
    const { instrumentName } = req.body;
    const [result] = await pool.query('INSERT INTO instruments (instrumentName) VALUES (?)', [instrumentName]);
    res.json({ instrumentId: result.insertId, instrumentName });
});

// Hangszer módosítása
router.put('/:id', async (req, res) => {
    const { instrumentName } = req.body;
    await pool.query('UPDATE instruments SET instrumentName = ? WHERE instrumentId = ?', [instrumentName, req.params.id]);
    res.json({ instrumentId: req.params.id, instrumentName });
});

// Hangszer törlése
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM instruments WHERE instrumentId = ?', [req.params.id]);
    res.json({ message: 'Hangszer törölve' });
});

// Router exportálása
export default router;