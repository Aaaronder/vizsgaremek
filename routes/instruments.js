import express from 'express';
import pool from '../db/pool.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM instruments');
    res.json(rows);
});

router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM instruments WHERE instrumentId = ?', [req.params.id]);
    res.json(rows[0]);
});

router.post('/', async (req, res) => {
    const { instrumentName } = req.body;
    const [result] = await pool.query('INSERT INTO instruments (instrumentName) VALUES (?)', [instrumentName]);
    res.json({ instrumentId: result.insertId, instrumentName });
});

router.put('/:id', async (req, res) => {
    const { instrumentName } = req.body;
    await pool.query('UPDATE instruments SET instrumentName = ? WHERE instrumentId = ?', [instrumentName, req.params.id]);
    res.json({ instrumentId: req.params.id, instrumentName });
});

router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM instruments WHERE instrumentId = ?', [req.params.id]);
    res.json({ message: 'Hangszer törölve' });
});

export default router;