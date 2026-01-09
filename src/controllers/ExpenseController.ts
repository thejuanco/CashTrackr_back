import type { Request, Response } from 'express'
import Expense from '../models/Expense'

export class ExpensesController {
    static getAll = async (req: Request, res: Response) => {
        
    }
  
    static create = async (req: Request, res: Response) => {
        try {
            const expense = new Expense(req.body)
            expense.budgetId = req.budget.id

            await expense.save()
            res.status(201).json("Gasto agregado correctamente")
        } catch (error) {
            res.status(500).json({error: "Ocurrio un error"})
        }
    }
  
    static getById = async (req: Request, res: Response) => {
        res.json(req.expense)
    }

    static updateById = async (req: Request, res: Response) => {
        try {
            req.expense.update(req.body)
            res.status(201).json("Gasto actualizado correctamente")
        } catch (error) {
            res.status(500).json({error: "Ocurrio un error"})
        }
    }
  
    static deleteById = async (req: Request, res: Response) => {
        try {
            req.expense.destroy()
            res.status(201).json("Gasto eliminado correctamente")
        } catch (error) {
            res.status(500).json({error: "Ocurrio un error"})
        }
    }
}