import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Összes felhasználó lekérése
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
});

// Egy adott felhasználó lekérése
router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE userId = ?', [req.params.id]);
    res.json(rows[0]);
});

// Új felhasználó hozzáadása
router.post('/', async (req, res) => {
    const { userName, userEmail, userPassword, userPp } = req.body;
    const [result] = await pool.query('INSERT INTO users (userName, userEmail, userPassword, userPp) VALUES (?, ?, ?, ?)', [userName, userEmail, userPassword, userPp]);
    res.json({ userId: result.insertId, userName });
});

// Felhasználó módosítása
router.put('/:id', async (req, res) => {
    const { userName, userEmail, userPassword, userPp } = req.body;
    await pool.query('UPDATE users SET userName = ?, userEmail = ?, userPassword = ?, userPp = ? WHERE userId = ?', [userName, userEmail, userPassword, userPp, req.params.id]);
    res.json({ userId: req.params.id, userName });
});

// Felhasználó törlése
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM users WHERE userId = ?', [req.params.id]);
    res.json({ message: 'Felhasználó törölve' });
});

export default router;