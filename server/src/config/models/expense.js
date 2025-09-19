// models/Expense.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
