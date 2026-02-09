import { Router } from "express";
import { body } from "express-validator";
import { BudgetController } from "../controllers/authController";

const router = Router()

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña es muy corta'),
    body('email')
        .isEmail().withMessage('El correo electronico no es valído'),
BudgetController.createAccount)

export default router