// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // This contains the userId from the token
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

const authorizeUser = (req, res, next) => {
    const userId = req.user.userId; // Extracted from the token in authenticateToken
    const requestedUserId = parseInt(req.params.id, 10); // ID from the route parameter

    if (userId !== requestedUserId) {
        return res.status(403).json({ error: 'Forbidden: You do not have access to this resource' });
    }

    next();
};

module.exports = {
    authenticateToken,
    authorizeUser
};
