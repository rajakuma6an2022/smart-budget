import express from "express";
import Income from "../config/models/income.js";
import { sendResult } from "../utils/index.js";

const router = express.Router();

// ----------------- CREATE INCOME ----------------- //
export const createIncome = async (req, res) => {
  try {
    const { amount, date, category, notes } = req.body;
    const income = new Income({
      user: req.user.id,
      amount,
      date,
      category,
      notes,
    });
    await income.save();

    sendResult(res, true, 200, "Income created successfully", income);
  } catch (err) {
    sendResult(res, false, 500, err.message);
  }
};

// ----------------- GET ALL INCOMES ----------------- //
export const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });
    sendResult(res, true, 200, "Incomes fetched successfully", incomes);
  } catch (err) {
    sendResult(res, false, 500, err.message);
  }
};

// ----------------- UPDATE INCOME ----------------- //
export const editIncome = async (req, res) => {
  try {

    // Check if income exists at all
    const incomeById = await Income.findById(req.params.id);
    if (!incomeById) {
      return sendResult(res, false, 404, "Income not found (invalid ID)");
    }

    // Update only if it belongs to the logged-in user
    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!income) {
      return sendResult(
        res,
        false,
        403,
        "You are not authorized to edit this income"
      );
    }

    sendResult(res, true, 200, "Income updated successfully", income);
  } catch (err) {
    console.error("Error in editIncome:", err.message);
    sendResult(res, false, 500, err.message);
  }
};


// ----------------- DELETE INCOME ----------------- //
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) return sendResult(res, false, "Income not found");

    sendResult(res, true, 200, "Income deleted successfully");
  } catch (err) {
    sendResult(res, false, 500, err.message);
  }
};

export default router;
