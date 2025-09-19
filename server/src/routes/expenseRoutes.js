import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createExpense,
  deleteExpense,
  editExpense,
  getAllExpenses,
} from "../controllers/expenseControllers.js";

const router = express.Router();

// Expense
router.post("/expense/create", protect, createExpense);
router.get("/expense/get", protect, getAllExpenses);
router.put("/expense/edit/:id", protect, editExpense);
router.delete("/expense/delete/:id", protect, deleteExpense);

export default router;
