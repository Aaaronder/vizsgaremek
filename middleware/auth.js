// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        console.log('Authorization Header:', req.header('Authorization')); // ÚJ DEBUG

        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            console.log('Nincs token a kérésben!');
            return res.status(401).json({ message: 'Hozzáférés megtagadva. Nincs token!' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Dekódolt token:', decoded); // Már itt is volt debug
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token ellenőrzési hiba:', error.message); // ÚJ DEBUG
        res.status(401).json({ message: 'Érvénytelen token' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user?.isAdmin !== 1) {
        return res.status(403).json({ message: 'Hozzáférés megtagadva. Admin jogosultság szükséges!' });
    }
    next();
};