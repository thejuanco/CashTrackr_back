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
        try {
            const {id} = req.params
            const budget = await Budget.findByPk(id)

            if(!budget){
                const error = new Error("Presupuesto no encontrado")
                return res.status(404).json({error: error.message})
            }
            
            res.json(budget)
        } catch (error) {
            res.status(500).json({errro: "Hubo un error al obtener los datos solicitados"})
        }
    }

    static updateById = async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const budget = await Budget.findByPk(id)

            if(!budget){
                const error = new Error("Presupuesto no encontrado")
                return res.status(404).json({error: error.message})
            }
            
            //Actualizar el presupuesto
            await budget.update(req.body)
            res.json('Presupuesto actualizado correctamente')
        } catch (error) {
            res.status(500).json({errro: "Hubo un error al obtener los datos solicitados"})
        }
    }

    static deleteById = async (req: Request, res: Response) => {
        console.log('Api budget gbi')
    }
}