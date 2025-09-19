import express from "express";
import protect  from "../middleware/authMiddleware.js";
import {
  createIncome,
  deleteIncome,
  editIncome,
  getAllIncomes,
} from "../controllers/incomeControllers.js";

const router = express.Router();

// income
router.post("/income/create", protect, createIncome);
router.get("/income/get", protect, getAllIncomes);
router.put("/income/edit/:id", protect, editIncome);
router.delete("/income/delete/:id", protect, deleteIncome);

export default router;
