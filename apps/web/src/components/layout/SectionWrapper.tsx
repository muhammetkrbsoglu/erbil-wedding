'use client';

import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
}

export function SectionWrapper({ children }: SectionWrapperProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background overflow-x-hidden"
    >
      <motion.div style={{ opacity }} className="w-full">
        {children}
      </motion.div>
    </motion.main>
  );
}
