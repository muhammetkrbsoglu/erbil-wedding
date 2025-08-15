"use client";

import * as React from "react";
import { motion, MotionProps } from "framer-motion";

// Small contract: reusable animation presets for pages, buttons and cards
export const pageTransition: MotionProps = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: [0.22, 0.8, 0.3, 1] },
};

export const fadeInUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 0.8, 0.3, 1] },
});

export const subtleScale = (delay = 0): MotionProps => ({
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.35, delay, ease: [0.2, 0.9, 0.25, 1] },
});

export function MotionDiv(props: MotionProps & { children?: React.ReactNode }) {
  return <motion.div {...props}>{props.children}</motion.div>;
}

export default MotionDiv;
