import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import CommonForm from "../components/common/CommonForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useGetIncomesQuery,
  useUpdateIncomeMutation,
} from "../redux/api-services/incomeApi";
import { Toast } from "../components/common/Toast";
import { useSelector } from "react-redux";

const categories = [
  { value: "salary", label: "Salary" },
  { value: "freelance", label: "Freelance" },
  { value: "investment", label: "Investment" },
  { value: "business", label: "Business" },
  { value: "rental_income", label: "Rental Income" },
  { value: "royalties", label: "Royalties" },
  { value: "dividends", label: "Dividends" },
  { value: "capital_gains", label: "Capital Gains" },
  { value: "pension", label: "Pension" },
  { value: "other", label: "Other" },
];


const Income = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({ mode: "all" });

  const [incomes, setIncomes] = useState([]);
  const [editingIncome, setEditingIncome] = useState(false);
  const [editingIncomeId, setEditingIncomeId] = useState(null);
  const [addIncome] = useAddIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();
  const [deleteIncome] = useDeleteIncomeMutation();
  const { data, isLoading, error } = useGetIncomesQuery();
  const currency = useSelector((st) => st.auth.user.currency);

  useEffect(() => {
    if (!isLoading && data) {
      setIncomes(data?.data);
    }
  }, [data, isLoading]);

  const onSubmit = async (data) => {
    try {
      const body = {
        name:data?.name,
        amount: data?.amount,
        date: data?.date,
        category: data?.category,
        notes: data?.notes,
      };
      console.log("body", body);
      let response;
      if (editingIncome) {
        response = await updateIncome({ id: editingIncomeId, ...body });
      } else {
        response = await addIncome(body);
      }
      if (response) {
        Toast.success(response?.data?.message);
        reset({
          amount: "",
          date: null,
          category: "",
          notes: "",
        });
        setEditingIncome(false);
        setEditingIncomeId(null);
      }
    } catch (error) {
      console.error("Login failed:", err);
      Toast.error(response?.data?.message);
    }
  };

  const handleEdit = (income) => {
    setEditingIncome(true);
    setEditingIncomeId(income?._id);
    reset({
      name:income?.name,
      amount: income?.amount,
      date: income?.date
        ? new Date(income.date).toISOString().split("T")[0]
        : "",
      category: income?.category,
      notes: income?.notes,
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteIncome(id);
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
        <h1 className="text-lg lg:text-2xl font-bold">Income Details</h1>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
        {/* Top Left - Incomes */}
        <motion.div
          className="w-full p-4 rounded-xl shadow-md bg-card border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="lg:text-lg text-lg font-semibold mb-4">My Incomes</h2>
          <ul className="space-y-2 overflow-y-auto flex-1">
            {incomes && incomes?.length > 0 ? (
              incomes?.map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="lg:text-lg text-base font-semibold mb-1">{item?.category}</p>
                      <span className="text-xs lg:text-sm font-semibold text-green-400">
                      +{currency}&nbsp;
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
                No incomes found
              </li>
            )}
          </ul>
        </motion.div>

        {/* Top Right - Add/Edit Income Form */}
        <CommonForm
          type="Income"
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          categories={categories}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
          editingIncome={editingIncome}
        />
      </div>
    </div>
  );
};

export default Income;
