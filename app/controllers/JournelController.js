import Journel from "../models/Journel.js";

// Create Journel Entry

export const createJournelEntry = async (req, res) => {
    try {
        const {note, moodtype} = req.body;
        const userId = req.user.id;
        const entry = await Journel.create({
            note,
            moodtype,
            userId
        })
        res.status(201).json({message: "Journel entry created", entry});
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
}

// get all journel entries for a user 

export const getJournelEntries = async (req, res) => {
    try {
        const userId = req.user.id;
        const entries = await Journel.findAll({where:{userId}});
        res.status(200).json({entries})
    } catch (err) {
        res.status(500).json({message: "something went wrong", error: err.message});
    }
}

//update journel data

export const updateJournalEntries = async (req,res) => {
    try {
        const userId = req.user.id;
        const {id} = req.params;
        const {moodtype, note} = req.body;
        const entry = await Journel.findOne({where:{id, userId}});
        if(!entry){
            return res.status(404).json({message:"Journel entry not found"})
        }

        if(moodtype){
            entry.moodtype = moodtype.toLowerCase().trim();
        }
        if(note){
            entry.note = note;
        }

        await entry.save();

        res.status(200).json({message: "Changes updated succesfully", entry})
    } catch (err){
        res.status(500).json({message: "Internel server error", error: err.message})
    }
}