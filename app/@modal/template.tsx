"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="w-1/2 h-auto min-h-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {children}
    </motion.div>
  );
}
