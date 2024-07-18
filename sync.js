const sequelize = require('./config/database');
const User = require('./models/User');
const List = require('./models/List');
const Task = require('./models/Task');

// Sync all models
sequelize.sync({ force: false }) // Set to true to drop tables and recreate them
    .then(() => {
        console.log('Database & tables created!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });
