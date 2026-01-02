import { getYearlyMoodAnalytics, getMonthlyMoodAnalytics, getMoodStates } from "../controllers/moodAnalytics.js";
import { authToken } from "../middlewares/checkAuth.js";
import express from "express";

const router = express.Router();

router.get('/overall-analytics', authToken, getMoodStates);
router.get('/monthly-analytics/:month', authToken, getMonthlyMoodAnalytics)
router.get('/yearly-analytics/:year', authToken, getYearlyMoodAnalytics)

export default router;