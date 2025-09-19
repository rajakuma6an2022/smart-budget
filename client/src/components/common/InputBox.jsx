import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";

const InputBox = forwardRef(
  (
    {
      label = "",
      type = "text",
      placeholder = "",
      className,
      onChange,
      disabled = false,
      register={}
    },
    ref
  ) => {
    const inputRef = useRef(null);
    const [verified, setVerified] = useState(false);

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      getValue: () => inputRef.current?.value,
      setValue: (val) => (inputRef.current.value = val),
      markVerified: () => setVerified(true),
      resetVerified: () => setVerified(false),
    }));

    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label className="block mb-1 text-sm font-medium text-text">
          {label}
        </label>
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange} 
            onWheel={(event) => event.currentTarget.blur()}
            {...register}
            className={`w-full px-3 py-2 rounded-lg border outline-none bg-card text-text ${className}`}
          />

          {/* Verified tick */}
          {verified && (
            <AiOutlineCheckCircle className="absolute right-2 text-green-500 w-5 h-5" />
          )}
        </div>
      </motion.div>
    );
  }
);

export default InputBox;
