import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import CommonForm from "../components/common/CommonForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
} from "../redux/api-services/expenseApi";
import { useSelector } from "react-redux";
import { Toast } from "../components/common/Toast";

const expenseCategories = [
  { value: "food", label: "Food & Dining" },
  { value: "rent", label: "Rent / Mortgage" },
  { value: "utilities", label: "Utilities (Electricity, Water, Internet)" },
  { value: "transportation", label: "Transportation" },
  { value: "healthcare", label: "Healthcare & Insurance" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "travel", label: "Travel & Vacation" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];


const Expense = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({ mode: "all" });

  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [addExpense] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const { data, isLoading, error } = useGetExpensesQuery();
  const currency = useSelector((st) => st.auth.user.currency);

  useEffect(() => {
    if (!isLoading && data) {
      setExpenses(data?.data);
    }
  }, [data, isLoading]);

  const onSubmit = async (data) => {
    try {
      const body = {
        name: data?.name,
        amount: data?.amount,
        date: data?.date,
        category: data?.category,
        notes: data?.notes,
      };
      
      let response;
      if (editingExpense) {
        response = await updateExpense({ id: editingExpenseId, ...body });
      } else {
        response = await addExpense(body);
      }
      if (response) {
        Toast.success(response?.data?.message);
        reset({
          amount: "",
          date: null,
          category: "",
          notes: "",
        });
        setEditingExpense(false);
        setEditingExpenseId(null);
      }
    } catch (error) {
      console.error("Login failed:", err);
      Toast.error(response?.data?.message);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(true);
    setEditingExpenseId(expense?._id);
    reset({
      name: expense?.name,
      amount: expense?.amount,
      date: expense?.date
        ? new Date(expense.date).toISOString().split("T")[0]
        : "",
      category: expense?.category,
      notes: expense?.notes,
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteExpense(id);
      if (response) {
        Toast.success(response?.data?.message);
      }
    } catch (error) {
      console.error("Login failed:", err);
      Toast.error(response?.data?.message);
    }
  };

  return (
    <div className="lg:p-3 space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-lg lg:text-2xl font-bold">Expense Details</h1>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
        <motion.div
          className="w-full p-4 rounded-xl shadow-md bg-card border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-lg lg:text-lg font-semibold mb-4">My Expenses</h2>
          <ul className="space-y-2 overflow-y-auto flex-1">
            {expenses && expenses?.length > 0 ? (
              expenses?.map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="text-base lg:text-lg font-semibold mb-1">
                      {item?.category}
                    </p>
                    <span className="text-xs lg:text-sm font-semibold text-red-400">
                      -{currency}&nbsp;
                      {item?.amount}
                    </span>
                  </div>
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.li>
              ))
            ) : (
              <li className="text-center text-gray-500 dark:text-gray-400 py-4">
                No Expenses found
              </li>
            )}
          </ul>
        </motion.div>

        <CommonForm
          type="Expense"
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          categories={expenseCategories}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
          editingIncome={editingExpense}
        />
      </div>
    </div>
  );
};

export default Expense;
