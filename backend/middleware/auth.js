// middleware/auth.js
import jwt from 'jsonwebtoken';

// Hitelesítési middleware
export const authenticate = async (req, res, next) => {
    try {
        // Token kinyerése
        const token = req.header('Authorization')?.replace('Bearer ', '');

        // Token ellenőrzése
        if (!token) {
            return res.status(401).json({ message: 'Hozzáférés megtagadva. Nincs token!' });
        }

        // Token érvényességének ellenőrzése
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Felhasználói adatok hozzáadása a kéréshez
        req.user = decoded;
        next();
    } catch (error) {
        // Token érvénytelen vagy lejárt
        res.status(401).json({ message: 'Érvénytelen token' });
    }
};

// Admin jogosultság ellenőrzése
export const isAdmin = (req, res, next) => {

    // Ellenőrzi, hogy a felhasználó admin-e
    if (req.user?.isAdmin !== 1) {
        return res.status(403).json({ message: 'Hozzáférés megtagadva. Admin jogosultság szükséges!' });
    }
    next();
};