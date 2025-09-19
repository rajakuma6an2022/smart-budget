import React from "react";
import { motion } from "framer-motion";

const Notes = ({ label, register, name, error, placeholder }) => {
  return (
    <motion.div
      className=" w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block mb-1 text-sm font-medium text-text">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        rows={3}
        {...register}
        className={`w-full px-3 py-2 rounded-lg border outline-none bg-card text-text resize-none
          `}
      ></textarea>
      {error && <p className="text-danger text-sm mt-1">{error.message}</p>}
    </motion.div>
  );
};

export default Notes;
