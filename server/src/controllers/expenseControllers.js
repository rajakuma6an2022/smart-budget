import express from "express";
import Expense from "../config/models/expense.js";
import { sendResult } from "../utils/index.js";

const router = express.Router();

// ----------------- CREATE Expense ----------------- //
export const createExpense = async (req, res) => {
  try {
    const { amount, date, category, notes } = req.body;
    const income = new Expense({
      user: req.user.id,
      amount,
      date,
      category,
      notes,
    });
    await income.save();
    sendResult(res, true, 200, "Expense created successfully", income);
  } catch (err) {
    sendResult(res, false, 500, err.message);
  }
};

// ----------------- GET ALL Expense ----------------- //
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1,
    });
    sendResult(res, true, 200, "Expenses fetched successfully", expenses);
  } catch (err) {
    sendResult(res, false, 500, err.message);
  }
};

// ----------------- UPDATE Expense ----------------- //
export const editExpense = async (req, res) => {
  try {
    const expenseById = await Expense.findById(req.params.id);
    if (!expenseById) {
      return sendResult(res, false, 404, "Expense not found (invalid ID)");
    }

    // Update only if it belongs to the logged-in user
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!expense) {
      return sendResult(
        res,
        false,
        403,
        "You are not authorized to edit this income"
      );
    }

    sendResult(res, true, 200, "Expense updated successfully", expense);
  } catch (err) {
    console.error("Error in editExpense:", err.message);
    sendResult(res, false, 500, err.message);
  }
};

// ----------------- DELETE Expense ----------------- //
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) return sendResult(res, false, "Income not found");

    sendResult(res, true, 200, "Income deleted successfully");
  } catch (err) {
    sendResult(res, false, 500, err.message);
  }
};

export default router;
