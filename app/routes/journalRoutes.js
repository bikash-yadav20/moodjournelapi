import { createJournelEntry, getJournelEntries, updateJournalEntries } from "../controllers/JournelController.js";
import express from "express";
import { authToken } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/entry", authToken, createJournelEntry);
router.get("/your-moods", authToken, getJournelEntries);
router.put("/update-mood/:id", authToken, updateJournalEntries);

export default router;