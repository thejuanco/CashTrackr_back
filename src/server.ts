import express from 'express' 
import morgan from 'morgan'
import { db } from './config/db'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log("Conexion exitosa a la base de datos")
    } catch (error) {
        console.log(error)
    }
}
connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())


export default app