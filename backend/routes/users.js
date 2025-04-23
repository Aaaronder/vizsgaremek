// Modúlok importálása
import express from 'express';
import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate, isAdmin } from '../middleware/auth.js';

// Express router az útvonalak kezelésére
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

// backend/routes/users.js
router.post('/register', async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    try {
        // 1. Email egyediség ellenőrzése
        const [existingUser] = await pool.query(
            'SELECT * FROM users WHERE userEmail = ?',
            [userEmail]
        );
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // 2. Jelszó titkosítás
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        // 3. Felhasználó létrehozása
        const [result] = await pool.query(
            'INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)',
            [userName, userEmail, hashedPassword]
        );

        res.status(201).json({
            success: true,
            userId: result.insertId
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Az email cím már foglalt' });
        }
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Szerverhiba',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
});

// Bejelentkezés
router.post('/login', async (req, res) => {
    console.log('Bejövő login kérés:', req.body); // Debug

    const [users] = await pool.query('SELECT * FROM users WHERE userEmail = ?', [req.body.userEmail]);
    console.log('Talált felhasználó:', users[0]); // Debug

    const { userEmail, userPassword } = req.body; // Mezőnevek illesztése

    try {
        // 1. Felhasználó keresése az adatbázisban
        const [users] = await pool.query('SELECT * FROM users WHERE userEmail = ?', [userEmail]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 2. Jelszó ellenőrzése
        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 3. JWT token generálása
        const token = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 4. Válasz küldése
        res.json({
            token,
            userId: user.userId,
            userName: user.userName,
            isAdmin: user.isAdmin
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});

// Frissített currentuser végpont
router.get('/currentuser', authenticate, async (req, res) => {
    try {
        const [user] = await pool.query(
            `SELECT 
                userId, 
                userName, 
                userEmail,
                isAdmin,
                userCreated
             FROM users 
             WHERE userId = ?`,
            [req.user.userId]
        );

        if (!user[0]) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Új admin végpont példa
router.get('/admin/users', authenticate, isAdmin, async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT userId, userName, userEmail FROM users'
        );
        res.json(users);
    } catch (error) {
        console.error('Admin error:', error);
        res.status(500).json({ message: 'Szerverhiba' });
    }
});

// Router exportálása
export default router;