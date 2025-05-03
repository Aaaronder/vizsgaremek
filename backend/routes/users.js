import express from 'express';
import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Alap CRUD műveletek
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
});

router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE userId = ?', [req.params.id]);
    res.json(rows[0]);
});

router.post('/', async (req, res) => {
    const { userName, userEmail, userPassword, userPp } = req.body;
    const [result] = await pool.query(
        'INSERT INTO users (userName, userEmail, userPassword, isAdmin) VALUES (?, ?, ?, ?)',
        [userName, userEmail, userPassword, userPp]
    );
    res.json({ userId: result.insertId, userName });
});

router.put('/:id', async (req, res) => {
    const { userName, userEmail, userPassword, userPp } = req.body;
    await pool.query(
        'UPDATE users SET userName = ?, userEmail = ?, userPassword = ?, isAdmin = ? WHERE userId = ?',
        [userName, userEmail, userPassword, userPp, req.params.id]
    );
    res.json({ userId: req.params.id, userName });
});

router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM users WHERE userId = ?', [req.params.id]);
    res.json({ message: 'Felhasználó törölve' });
});

// Auth funkciók
router.post('/register', async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    try {
        const [existingUser] = await pool.query('SELECT * FROM users WHERE userEmail = ?', [userEmail]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        const [result] = await pool.query(
            'INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)',
            [userName, userEmail, hashedPassword]
        );

        res.status(201).json({ success: true, userId: result.insertId });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Szerverhiba',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
});

// Bejelentkezés
router.post('/login', async (req, res) => {
    const { userEmail, userPassword } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE userEmail = ?', [userEmail]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: '1h' }
        );

        res.json({
            token,
            userId: user.userId,
            userName: user.userName,
            userEmail: user.userEmail,
            userCreated: user.userCreated,
            isAdmin: user.isAdmin
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});

// Felhasznalo adatai
router.get('/me', authenticate, async (req, res) => {
    try {
        const userId = req.user.userId;
        const [users] = await pool.query(
            'SELECT userId, userName FROM users WHERE userId = ?',
            [userId]
        );

        if (!users[0]) {
            return res.status(404).json({ message: 'Felhasználó nem található', userId });
        }

        res.json({ userId: users[0].userId, userName: users[0].userName });
    } catch (error) {
        console.error('Hiba:', error);
        res.status(500).json({ message: 'Szerver hiba: ' + error.message });
    }
});

// Felhasznalo adatai megvaltoztatasa
router.put('/me', authenticate, async (req, res) => {
    const userId = req.user.userId;
    const { userName, userEmail } = req.body;
    try {
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE userEmail = ? AND userId != ?', [userEmail, userId]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Az email már használatban van' });
        }
        await pool.query(
            'UPDATE users SET userName = ?, userEmail = ? WHERE userId = ?',
            [userName, userEmail, userId]
        );
        res.json({ message: 'Adatok frissítve' });
    } catch (error) {
        console.error('Frissítési hiba:', error);
        res.status(500).json({ message: 'Szerver hiba' });
    }
});

export default router;