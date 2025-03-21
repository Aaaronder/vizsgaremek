// Modúlok importálása
import express from 'express';
import pool from '../config/db.js';

// Express router az útvonalak kezelésére
const router = express.Router();

// Összes műfaj lekérése
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM genres');
    res.json(rows);
});

// Egy adott műfaj lekérése
router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM genres WHERE genreId = ?', [req.params.id]);
    res.json(rows[0]);
});

// Új műfaj hozzáadása
router.post('/', async (req, res) => {
    const { genreName } = req.body;
    const [result] = await pool.query('INSERT INTO genres (genreName) VALUES (?)', [genreName]);
    res.json({ genreId: result.insertId, genreName });
});

// Műfaj módosítása
router.put('/:id', async (req, res) => {
    const { genreName } = req.body;
    await pool.query('UPDATE genres SET genreName = ? WHERE genreId = ?', [genreName, req.params.id]);
    res.json({ genreId: req.params.id, genreName });
});

// Műfaj törlése
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM genres WHERE genreId = ?', [req.params.id]);
    res.json({ message: 'Műfaj törölve' });
});

// Router exportálása
export default router;