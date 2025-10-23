import type { Request, Response } from "express"

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        console.log('desde api/budget')
    }
    
    static create = async (req: Request, res: Response) => {
        console.log('create api/budget')
    }
}