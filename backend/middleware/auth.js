// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Hozzáférés megtagadva. Nincs token!' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Érvénytelen token' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user?.isAdmin !== 1) {
        return res.status(403).json({ message: 'Hozzáférés megtagadva. Admin jogosultság szükséges!' });
    }
    next();
};