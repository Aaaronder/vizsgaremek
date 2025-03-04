import express from 'express';
import pool from '../db/pool.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM genres');
    res.json(rows);
});

router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM genres WHERE genreId = ?', [req.params.id]);
    res.json(rows[0]);
});

router.post('/', async (req, res) => {
    const { genreName } = req.body;
    const [result] = await pool.query('INSERT INTO genres (genreName) VALUES (?)', [genreName]);
    res.json({ genreId: result.insertId, genreName });
});

router.put('/:id', async (req, res) => {
    const { genreName } = req.body;
    await pool.query('UPDATE genres SET genreName = ? WHERE genreId = ?', [genreName, req.params.id]);
    res.json({ genreId: req.params.id, genreName });
});

router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM genres WHERE genreId = ?', [req.params.id]);
    res.json({ message: 'Műfaj törölve' });
});

export default router;