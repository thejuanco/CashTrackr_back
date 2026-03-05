import { type Request, type Response } from "express"
import User from "../models/User"
import { hashPassword } from "../utils/auth"

export class BudgetController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body

            //prevenir usuarios duplicados
            const userExists = await User.findOne({where: {email}})
            if(userExists){
                const error = new Error('El usuario ya existe')
                return res.status(409).json({error: error.message})
            }

            //Guardar el usuario
            const user = new User(req.body)
            user.password = await hashPassword(password)
            await user.save()

            res.json('Cuenta creada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}