import { type Request, type Response } from "express"
import Budget from "../models/Budget"

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                //TODO: Filtrar por el usuario
                // limit: 10,
                // where: {
                //     name: 'Vacaciones'
                // }
            })
            res.json(budgets)
        } catch (error) {
            console.log(error)
        }
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
        res.json(req.budget)
    }

    static updateById = async (req: Request, res: Response) => {
        await req.budget.update(req.body)
        res.json('Presupuesto actualizado correctamente')
    }

    static deleteById = async (req: Request, res: Response) => {
        await req.budget.destroy()
        res.json('Presupuesto eliminado correctamente')
    }
}