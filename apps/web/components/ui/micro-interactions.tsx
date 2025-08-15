"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MicroInteractionProps {
  children: ReactNode
  type?: "hover-lift" | "hover-glow" | "hover-rotate" | "hover-scale" | "press-down"
  className?: string
}

export function MicroInteraction({ children, type = "hover-lift", className }: MicroInteractionProps) {
  const animations = {
    "hover-lift": {
      whileHover: { y: -2, transition: { duration: 0.2 } },
      whileTap: { y: 0, transition: { duration: 0.1 } },
    },
    "hover-glow": {
      whileHover: {
        boxShadow: "0 0 20px rgba(var(--accent), 0.4)",
        transition: { duration: 0.3 },
      },
    },
    "hover-rotate": {
      whileHover: { rotate: 5, transition: { duration: 0.2 } },
    },
    "hover-scale": {
      whileHover: { scale: 1.05, transition: { duration: 0.2 } },
      whileTap: { scale: 0.95, transition: { duration: 0.1 } },
    },
    "press-down": {
      whileTap: { scale: 0.98, y: 1, transition: { duration: 0.1 } },
    },
  }

  return (
    <motion.div className={className} {...animations[type]}>
      {children}
    </motion.div>
  )
}

// Specialized micro-interaction components
export function HoverLift({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ y: 0, transition: { duration: 0.1 } }}
    >
      {children}
    </motion.div>
  )
}

export function HoverGlow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{
        boxShadow: "0 8px 30px rgba(var(--accent), 0.3)",
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  )
}

export function PressDown({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} whileTap={{ scale: 0.98, y: 1, transition: { duration: 0.1 } }}>
      {children}
    </motion.div>
  )
}
