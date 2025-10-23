import express from 'express' 
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './router/budgetRouter'

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

//Rutas
app.use('/api/budget', budgetRouter)

export default app