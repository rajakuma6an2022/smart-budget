import React from "react";
import { motion } from "framer-motion";
import InputBox from "./InputBox";
import Dropdown from "./Dropdown";
import DatePicker from "./DatePicker";
import Notes from "./Notes";
import FormErrorMessage from "../../components/common/FormErrorMessage";

const CommonForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  categories,
  type,
  getValues,
  setValue,
  watch,
  editingIncome,
  editingExpense,
}) => {
  const editOption = editingIncome || editingExpense;
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full  p-4 rounded-xl shadow-md bg-card border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-lg lg:text-lg font-semibold">
        {editOption ? "Edit" : "Add"} {type}
      </h2>

      <div>
        <InputBox
          label="Amount"
          name="amount"
          type="number"
          placeholder="e.g. 1000"
          register={register("amount", { required: true })}
          error={errors}
        />
        <FormErrorMessage
          error={errors.amount}
          messages={{
            required: "Amount is required",
          }}
        />
      </div>
      <div className="my-2">
        <DatePicker
          label="Date"
          name="date"
          register={register("date", { required: true })}
          error={errors}
        />
        <FormErrorMessage
          error={errors.date}
          messages={{
            required: "Date is required",
          }}
        />
      </div>
      <div className="my-2">
        <Dropdown
          label="Category"
          name="category"
          register={register("category", { required: true })}
          options={categories}
          error={errors}
        />
        <FormErrorMessage
          error={errors.category}
          messages={{
            required: "Category is required",
          }}
        />
      </div>
      <div>
        <Notes
          label="Notes"
          name="notes"
          placeholder="Write a short note..."
          register={register("notes", { required: true })}
          error={errors}
        />
        <FormErrorMessage
          error={errors.notes}
          messages={{
            required: "Notes is required",
          }}
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2 mt-2 rounded-lg bg-primary text-sm lg:text-base text-white font-semibold shadow-md"
      >
        {editOption ? "Edit" : "Add"} {type}
      </motion.button>
    </motion.form>
  );
};

export default CommonForm;
