import { motion } from "framer-motion";

export function Button({
  children,
  className = "",
  onClick,
  variant = "primary",
  size = "md",
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-semibold focus:outline-none transition-colors";

  const variants = {
    primary: "bg-primary text-white hover:opacity-90",
    outline: "border border-text-muted text-text hover:bg-bg",
    danger: "bg-danger text-white hover:opacity-90",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
