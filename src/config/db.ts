import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"
dotenv.config()

export const db = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false,
        },
    }
})