import express from 'express';
import sequelize from './db/config.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import JournelRoutes from './routes/journalRoutes.js';
import moodAnalyticsRoutes from './routes/moodAnalyticsRoutes.js';
const app = express();
app.use(express.json());

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing models:", error);
    }

})();

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/journel', JournelRoutes);
app.use('/api/mood-analytics', moodAnalyticsRoutes);


app.get('/', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.send('Database connected successfully');
    } catch (err) {
        res.status(500).send('Unable to access the database:', err);
    }
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 