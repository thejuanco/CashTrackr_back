import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name")
        .notEmpty().withMessage("El nombre del gasto no puede ir vacío").run(req)

    await body("amount")
        .notEmpty().withMessage("La cantidad del gasto no puede ir vacío")
        .isNumeric().withMessage("Cantidad no válida")
        .custom(value => value > 0).withMessage("El gasto debe ser mayor a cero").run(req)

    next();
}