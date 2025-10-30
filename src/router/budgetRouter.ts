import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudget, validateBudgetExists, validateBudgetInput } from "../middleware/budget";

const router = Router()

//Cada ruta que utilice id, se valida automaticamente
router.param('budgetId', validateBudget)
router.param('budgetId', validateBudgetExists)

router.get("/", BudgetController.getAll)

router.post("/", 
    validateBudgetInput,
    handleInputErrors,
BudgetController.create)

router.get("/:budgetId", BudgetController.getById)

router.put("/:budgetId",
    validateBudgetInput,
    handleInputErrors,
BudgetController.updateById)

router.delete("/:budgetId", BudgetController.deleteById)

export default router