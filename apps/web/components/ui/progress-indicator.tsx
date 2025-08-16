"use client"

import { motion } from "framer-motion"

interface ProgressIndicatorProps {
  steps: Array<{ title: string; completed: boolean; active: boolean }>
  className?: string
}

export function ProgressIndicator({ steps, className }: ProgressIndicatorProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <motion.div
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
              step.completed
                ? "bg-accent border-accent text-text"
                : step.active
                  ? "border-accent text-accent bg-accent/10"
                  : "border-muted text-muted-foreground"
            }`}
            animate={{
              scale: step.active ? 1.1 : 1,
              backgroundColor: step.completed
                ? "hsl(var(--accent))"
                : step.active
                  ? "hsla(var(--accent), 0.1)"
                  : "transparent",
            }}
            transition={{ duration: 0.3 }}
          >
            {step.completed ? (
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </motion.svg>
            ) : (
              <span className="text-sm font-semibold">{index + 1}</span>
            )}

            {step.active && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </motion.div>

          <div className="ml-3 hidden sm:block">
            <div className={`text-sm font-medium ${step.active ? "text-foreground" : "text-muted-foreground"}`}>
              {step.title}
            </div>
          </div>

          {index < steps.length - 1 && (
            <motion.div
              className="w-12 h-0.5 mx-4 bg-muted"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: step.completed ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ originX: 0 }}
            >
              <motion.div
                className="h-full bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step.completed ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}
