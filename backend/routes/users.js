// Modúlok importálása
import express from 'express';
import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

// Regisztráció
router.post('/register', async (req, res) => {
    const { userName, userEmail, userPassword } = req.body; // Mezőnevek illesztése a táblához

    try {
        // 1. Jelszó titkosítás
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        // 2. Felhasználó mentése az adatbázisba
        const [result] = await pool.query(
            'INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)',
            [userName, userEmail, hashedPassword]
        );

        // 3. Válasz küldése
        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Registration error:', error);

        // Ha az email már foglalt (UNIQUE constraint)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already exists' });
        }

        res.status(500).json({ message: 'Registration failed' });
    }
});

// Bejelentkezés
router.post('/login', async (req, res) => {
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
            {
                userId: user.userId,  // Mezőnév illesztése
                isAdmin: user.isAdmin
            },
            'your_jwt_secret_key', // Cseréld le valós kulcsra!
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

// Teszteléshez: Összes felhasználó listázása (CSAK FEJLESZTÉS KÖZBEN!)
router.get('/test/all-users', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT userId, userName FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tesztfelhasználó létrehozása
router.post('/test/create-test-user', async (req, res) => {
    const hashedPassword = await bcrypt.hash('test123', 10);
    await pool.query(
        'INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)',
        ['testuser', 'test@example.com', hashedPassword]
    );
    res.json({ message: 'Test user created' });
});

// Router exportálása
export default router;