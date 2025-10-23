import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"
dotenv.config()

export const db = new Sequelize(process.env.DATABASE_URL as string, {
    models: [__dirname + '/../models/**/*'],
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false,
        },
    }
})