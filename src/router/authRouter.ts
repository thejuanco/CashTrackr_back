import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/authController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña es muy corta'),
    body('email')
        .isEmail().withMessage('El correo electronico no es valído'),
AuthController.createAccount)

router.post('/confirm-account', 
    body('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Token no válido'),
    handleInputErrors,
    AuthController.confirmAccount
)

export default router