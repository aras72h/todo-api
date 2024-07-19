const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { handleErrors } = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/lists', listRoutes);
app.use('/lists', taskRoutes);

// Error handling middleware
app.use('/', handleErrors);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        // Sync database
        await sequelize.sync();
        console.log('Database synchronized');
        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

startServer();