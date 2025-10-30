import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudget } from "../middleware/budget";

const router = Router()

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

router.get("/:id", 
    validateBudget,
BudgetController.getById)

router.put("/:id",  
    validateBudget,
    body("name")
        .notEmpty().withMessage("El nombre del presupuesto no puede ir vacío"),
    body("amount")
        .notEmpty().withMessage("La cantidad del presupuesto no puede ir vacío")  
        .isNumeric().withMessage("Cantidad no válida") 
        .custom(value => value > 0 ).withMessage("El presupuesto debe ser mayor a cero"),
    handleInputErrors,
BudgetController.updateById, )

router.delete("/:id", 
    validateBudget,
    handleInputErrors,
BudgetController.deleteById)

export default router