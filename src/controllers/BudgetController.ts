import { response, type Request, type Response } from "express"

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        console.log('desde api/budget')
    }
    
    static create = async (req: Request, res: Response) => {
        console.log('create api/budget')
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