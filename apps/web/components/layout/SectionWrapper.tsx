"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
}

export function SectionWrapper({ children, ...props }: SectionWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut" 
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
