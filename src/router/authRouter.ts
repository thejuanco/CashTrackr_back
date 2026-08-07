import { Router } from "express";
import { body, param } from "express-validator";
import { AuthController } from "../controllers/authController";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";

const router = Router()

router.use(limiter)

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña es muy corta'),
    body('email')
        .isEmail().withMessage('El correo electronico no es valído'),
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Token no válido'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login', 
    body('email').
        isEmail().withMessage("El correo no es válido"),
    body('password')
        .notEmpty().withMessage("La contraseña es obligatoria"),
    AuthController.login
)

router.post('/forgot-password', 
    body('email').
        isEmail().withMessage("El correo no es válido"),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token', 
    body('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Token no válido'),
    handleInputErrors,
    AuthController.validateToken
)

router.post('/reset-password/:token',
    param('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Token no válido'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña es muy corta'),
    handleInputErrors,
    AuthController.resetPasswordWithToken
)

router.get('/user',
    AuthController.user
)

export default router