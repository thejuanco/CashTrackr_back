import { type Request, type Response } from "express"

export class BudgetController {
    static createAccount = async (req: Request, res: Response) => {
        res.json({ message: "Cuenta creada exitosamente" })
    }
}