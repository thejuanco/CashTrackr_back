import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";

export const validateBudget = async (req: Request, res: Response, next: NextFunction) => {
    await param("id").isInt().withMessage("ID no válido").custom(value => value > 0).withMessage("Número no válido").run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}