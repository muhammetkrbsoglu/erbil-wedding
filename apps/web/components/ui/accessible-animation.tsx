"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-animation"
import { useLazyAnimation } from "@/hooks/use-performance"

interface AccessibleAnimationProps {
  children: ReactNode
  animation?: Variants
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  reducedMotionFallback?: Variants
  ariaLabel?: string
  role?: string
}

export function AccessibleAnimation({
  children,
  animation,
  className,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  reducedMotionFallback,
  ariaLabel,
  role,
}: AccessibleAnimationProps) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, isVisible } = useLazyAnimation(threshold)

  const defaultAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const reducedAnimation: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        delay: 0,
      },
    },
  }

  const finalAnimation = prefersReducedMotion
    ? reducedMotionFallback || reducedAnimation
    : animation || defaultAnimation

  return (
    <motion.div
      // ref typing from useLazyAnimation can be broader; cast to any to satisfy motion.div generic
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      className={`${className} animate-gpu`}
      variants={finalAnimation}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      aria-label={ariaLabel}
      role={role}
      style={{
        willChange: isVisible ? "transform, opacity" : "auto",
      }}
    >
      {children}
    </motion.div>
  )
}
