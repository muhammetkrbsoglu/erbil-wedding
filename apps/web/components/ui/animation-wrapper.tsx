"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimationWrapperProps {
  children: ReactNode
  animation?: Variants
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
}

export function AnimationWrapper({
  children,
  animation,
  className,
  delay = 0,
  duration,
  once = true,
  threshold = 0.1,
}: AnimationWrapperProps) {
  const defaultAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration || 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <motion.div
      className={cn(className)}
      variants={animation || defaultAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
    >
      {children}
    </motion.div>
  )
}

// Specialized animation components
export function FadeInUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <AnimationWrapper
      animation={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </AnimationWrapper>
  )
}

export function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <AnimationWrapper
      animation={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.4,
            delay,
            ease: [0.68, -0.55, 0.265, 1.55],
          },
        },
      }}
      className={className}
    >
      {children}
    </AnimationWrapper>
  )
}

export function SlideInLeft({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <AnimationWrapper
      animation={{
        hidden: { opacity: 0, x: -50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </AnimationWrapper>
  )
}

export function SlideInRight({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <AnimationWrapper
      animation={{
        hidden: { opacity: 0, x: 50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </AnimationWrapper>
  )
}
