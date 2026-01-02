import Journel from "../models/Journel.js";

export const getMoodStates = async (req, res) => {
    try {
        const userId = req.user.id;
        const entries = await Journel.findAll({where:{userId}});
        if(!entries.length){
            return res.status(404).json({message: "No journel entries found"});
        };

        //count moods

        const moodCounts = {};
        entries.forEach(entry =>{
            const mood = entry.moodtype.toLowerCase().trim();
            moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        });

        // calculate percentages

        const totalEntries = entries.length;
        const moodPercentage = {};
        for(const mood in moodCounts){
            moodPercentage[mood] = ((moodCounts[mood] / totalEntries) * 100).toFixed(2);
        }
        res.status(200).json({"totalEntries": totalEntries, "moodCounts": moodCounts, "moodPercentage": moodPercentage});
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
}


// get monthly mood analytics

export const getMonthlyMoodAnalytics = async (req, res) => {
    try { 
        
        const userId = req.user.id;

        const {month} =req.params;

        const entries = await Journel.findAll({where: {userId}});
        if(!entries.length){
            return res.status(404).json({message: "No journel entries found"});
        };

        const monthlyMoodCounts = {};

        entries.forEach( entry => {
            const entryMonth = entry.createdAt.toISOString().slice(0,7);
            const mood = entry.moodtype.toLowerCase().trim();

            if(month && entryMonth !== month){
                return;
            }

            if(!monthlyMoodCounts[entryMonth]){
                monthlyMoodCounts[entryMonth] = {};
            };

            monthlyMoodCounts[entryMonth][mood] = (monthlyMoodCounts[entryMonth][mood] || 0) +1;
        });

         //calculate percentage monthly

    const monthlyPercentage = {};
    for(const monthKey in monthlyMoodCounts){
        const  moods = monthlyMoodCounts[monthKey];
        const totalMoods = Object.values(moods).reduce((sum, count) => sum + count, 0);
        monthlyPercentage[monthKey] = {};
        for (const mood in moods) { 
            monthlyPercentage[monthKey][mood] = ( (moods[mood] / totalMoods) * 100 ).toFixed(2); 
        }
    };

        res.status(200).json({monthlyMoodCounts, monthlyPercentage});
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    };


}


// get yearly mood analytics

export const getYearlyMoodAnalytics = async (req, res) => {
    try {

        const userId = req.user.id;
        const yearParam = req.params.year ? parseInt(req.params.year, 10) : null;

        const entries = await Journel.findAll({where: {userId}});

        if(!entries.length) {
            return res.status(404).json({message: "No journel entries found"});
        };

        const yearlyMoodCount = {};
        entries.forEach(entry =>{
            const entryYear = entry.createdAt.getFullYear();
            const moods = entry.moodtype.toLowerCase().trim();

            if(yearParam && entryYear !== yearParam){
                return;
            };

            if(!yearlyMoodCount[entryYear]){
                yearlyMoodCount[entryYear] = {};
            };

            yearlyMoodCount[entryYear][moods] = (yearlyMoodCount[entryYear][moods] || 0) + 1;

        });

        //calculate yearly percentage
        const yearlyPercentage = {}

        for(const yearKey in yearlyMoodCount ){
            const moods = yearlyMoodCount[yearKey];
            const totalMoods = Object.values(moods).reduce((sum, count) => sum + count, 0);
            yearlyPercentage[yearKey] = {};

            for(const mood in moods){
                yearlyPercentage[yearKey][mood] = ((moods[mood] / totalMoods) * 100).toFixed(2);
            }
        }

        res.status(200).json({yearlyMoodCount, yearlyPercentage});
    } catch (err){
        res.status(500).json({message: "server error", error: err.message})
    }
}

