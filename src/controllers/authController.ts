import { type Request, type Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"
import { generateTokenJWT } from "../utils/jwt"

export class AuthController {
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
            user.token = generateToken()
            await user.save()

            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token
            })

            res.json('Cuenta creada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        const {token} = req.body
        
        const user = await User.findOne({where: {token}})
        if(!user){
            const error = new Error('Token no válido')
            return res.status(401).json({error: error.message})
        }  
        user.confirmed = true
        user.token = null
        await user.save()

        res.json("Cuenta confirmada correctamente")
    }

    static login = async (req: Request, res: Response) => {
        try{
            const {email, password } = req.body

            //Validar que el usuario exista
            const user = await User.findOne({where: {email}})
            if(!user){
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({error: error.message})
            }

            if(!user.confirmed){
                const error = new Error('La cuenta no ha sido confirmada')
                return res.status(403).json({error: error.message})
            }

            const isPasswordCorrect = await checkPassword(password, user.password)
            if(!isPasswordCorrect){
                const error = new Error('La contraseña no es correcta')
                return res.status(403).json({error: error.message})
            }
            
            const token = generateTokenJWT(user.id)
            res.json(token)

        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        try{
            const { email } = req.body

            //Validar que el usuario exista
            const user = await User.findOne({where: {email}})
            if(!user){
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({error: error.message})
            }

            user.token = generateToken()
            await user.save()
            
            await AuthEmail.sendPasswordResetToken({
                name: user.name,
                email: user.email,
                token: user.token
            })

            res.json('Revisa tu correo para instrucciones')

        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static validateToken = async (req: Request, res: Response) => {
        try{
            const { token } = req.body
            const tokenExists = await User.findOne({where: {token}})
            if(!tokenExists) {
                const error = new Error('Token no válido')
                return res.status(404).json({error: error.message})
            }

            res.json('Token válido')

        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static resetPasswordWithToken = async (req: Request, res: Response) => {
        try{
            const { token } = req.params
            const { password } = req.body

            const user = await User.findOne({where: {token}})
            if(!user) {
                const error = new Error('Token no válido')
                return res.status(404).json({error: error.message})
            }

            //Actualizar contraseña
            user.password = await hashPassword(password)
            user.token = null
            await user.save()
            
            res.json('La contraseña se actualizo correctamente')

        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static user = async (req: Request, res: Response) => {
        const bearer = req.headers.authorization

        if(!bearer){
            const error = new Error("No autorizado")
            return res.status(401).json({error: error.message})
        }
        
        const [ , token] = bearer.split(' ')
        if(!token){
            const error = new Error("Token no válido")
            return res.status(401).json({error: error.message})
        }

        try{
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            res.json(decoded)

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}