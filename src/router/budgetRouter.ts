import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudget, validateBudgetExists, validateBudgetInput } from "../middleware/budget";
import { ExpensesController } from "../controllers/ExpenseController";
import { validateExpenseInput } from "../middleware/expense";

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

/* Rutas para Gastos */
router.get('/:budgetId/expenses', ExpensesController.getAll)

router.post('/:budgetId/expenses',
    validateExpenseInput,
    handleInputErrors,
ExpensesController.create)

router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router