import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Journel = sequelize.define("Journel",{
    note:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    moodtype:{
        type: DataTypes.ENUM('happy', 'sad', 'angry', 'neutral', 'excited', 'anxious'),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
}
, { timestamps: true }
)

export default Journel;