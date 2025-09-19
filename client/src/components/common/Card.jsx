import { motion } from "framer-motion";

// Card wrapper
export function Card({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-2xl shadow-xl border border-bg bg-card text-text ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Card content (padding area inside card)
export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
