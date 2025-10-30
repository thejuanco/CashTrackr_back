import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudget, validateBudgetExists } from "../middleware/budget";

const router = Router()

//Cada ruta que utilice id, se valida automaticamente
router.param('budgetId', validateBudget)
router.param('budgetId', validateBudgetExists)

router.get("/", BudgetController.getAll)

router.post("/", 
    body("name")
        .notEmpty().withMessage("El nombre del presupuesto no puede ir vacío"),
    body("amount")
        .notEmpty().withMessage("La cantidad del presupuesto no puede ir vacío")  
        .isNumeric().withMessage("Cantidad no válida") 
        .custom(value => value > 0 ).withMessage("El presupuesto debe ser mayor a cero"),
    handleInputErrors,
BudgetController.create)

router.get("/:budgetId", BudgetController.getById)

router.put("/:budgetId",
    body("name")
        .notEmpty().withMessage("El nombre del presupuesto no puede ir vacío"),
    body("amount")
        .notEmpty().withMessage("La cantidad del presupuesto no puede ir vacío")  
        .isNumeric().withMessage("Cantidad no válida") 
        .custom(value => value > 0 ).withMessage("El presupuesto debe ser mayor a cero"),
    handleInputErrors,
BudgetController.updateById, )

router.delete("/:budgetId", BudgetController.deleteById)

export default router