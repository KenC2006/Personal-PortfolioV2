"use client";

import { motion } from "framer-motion";

interface TechTagProps {
  children: string;
  className?: string;
}

export default function TechTag({ children, className = "" }: TechTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`inline-block px-2 py-1 text-xs font-medium text-gray-300 bg-white/5 rounded border border-white/10 ${className}`}
    >
      {children}
    </motion.span>
  );
}


