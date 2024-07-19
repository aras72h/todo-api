// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ username, email, password: hashedPassword });

        // Return response
        res.status(201).json({ id: user.id, username: user.username, email: user.email });
    } catch (err) {
        console.error('Error in register:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const tokenPayload = { id: user.id, email: user.email };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token
        res.json({ token });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ error: 'Server error' });
    }
};


const logout = async (req, res) => {
    // Additional logic based on your authentication strategy (e.g., JWT, session)
    // For example, clearing session or token from client-side
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    register,
    login,
    logout,
};
