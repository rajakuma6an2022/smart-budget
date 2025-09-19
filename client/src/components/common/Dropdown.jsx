import React from "react";
import { motion } from "framer-motion";

const Dropdown = ({ label, register, name, options, error }) => {
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
      <select
        {...register}
        className={`w-full px-3 py-2 rounded-lg border outline-none bg-card text-text 
          `}
      >
        <option value="">Select...</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-danger text-sm mt-1">{error.message}</p>}
    </motion.div>
  );
};

export default Dropdown;
