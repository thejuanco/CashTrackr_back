import { Router } from "express";
import { BudgetController } from "../controllers/authController";

const router = Router()

router.post('/create-account', BudgetController.createAccount)

export default router