"use client"

import { motion, useScroll, useSpring } from "framer-motion"

interface ScrollProgressProps {
  className?: string
  color?: string
}

export function ScrollProgress({ className, color = "hsl(var(--accent))" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-accent/20 z-50 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div className="h-full bg-accent origin-left" style={{ scaleX }} />
    </motion.div>
  )
}
