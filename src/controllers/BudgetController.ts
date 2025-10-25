import { type Request, type Response } from "express"
import Budget from "../models/Budget"

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        console.log('desde api/budget')
    }
    
    static create = async (req: Request, res: Response) => {
        try {
            const budget = new Budget(req.body)
            await budget.save()
            return res.status(201).json("Presupuesto creado correctamente")
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Hubo un error"})
        }
    }

    static getById = async (req: Request, res: Response) => {
        console.log('Api budget gbi')
    }

    static updateById = async (req: Request, res: Response) => {
        console.log('Api budget gbi')
    }

    static deleteById = async (req: Request, res: Response) => {
        console.log('Api budget gbi')
    }
}