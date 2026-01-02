import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        logging: false,
    }
);

try {
    await sequelize.authenticate();
    console.log("Database connected succefully");
} catch (err) {
    console.error("Unable to access the database:", err);
}

export default sequelize;