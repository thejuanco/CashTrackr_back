import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Expense from "../models/Expense";

//Sobreescribiendo la propiedad de Request en express
declare global {
    namespace Express {
        interface Request {
            expense?: Expense
        }
    }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name")
        .notEmpty().withMessage("El nombre del gasto no puede ir vacío").run(req)

    await body("amount")
        .notEmpty().withMessage("La cantidad del gasto no puede ir vacío")
        .isNumeric().withMessage("Cantidad no válida")
        .custom(value => value > 0).withMessage("El gasto debe ser mayor a cero").run(req)

    next();
}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
    await param("expenseId").isInt().custom(value => value > 0)
        .withMessage("ID no válido").run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next();
}

export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //debugger
        const { expenseId } = req.params
        const expense = await Expense.findByPk(expenseId)
        console.log(expenseId)

        if (!expense) {
            const error = new Error("Gasto no encontrado")
            return res.status(404).json({ error: error.message })
        }

        //Actualizar el presupuesto
        req.expense = expense

        next()
    } catch (error) {
        res.status(500).json({ errro: "Hubo un error al obtener los datos solicitados" })
    }
}