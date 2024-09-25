"use client";
import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div className="flex flex-col flex-auto " initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: "easeInOut", duration: 0.75 }}>
      {children}
    </motion.div>
  );
}
