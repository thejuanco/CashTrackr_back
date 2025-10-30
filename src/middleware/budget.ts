import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";
import Budget from "../models/Budget";

//Sobreescribiendo la propiedad de Request en express
declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}

export const validateBudget = async (req: Request, res: Response, next: NextFunction) => {
    await param("budgetId").isInt().withMessage("ID no válido").custom(value => value > 0).withMessage("Número no válido").run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

export const validateBudgetExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { budgetId } = req.params
        const budget = await Budget.findByPk(budgetId)

        if (!budget) {
            const error = new Error("Presupuesto no encontrado")
            return res.status(404).json({ error: error.message })
        }

        //Actualizar el presupuesto
        req.budget = budget

        next()
    } catch (error) {
        res.status(500).json({ errro: "Hubo un error al obtener los datos solicitados" })
    }
}