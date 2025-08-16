"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, CheckCircle } from "lucide-react"
import type { ReactNode } from "react"

interface FormFieldProps {
  children: ReactNode
  label?: string
  error?: string
  success?: string
  required?: boolean
  className?: string
}

export function FormField({ children, label, error, success, required, className }: FormFieldProps) {
  return (
    <motion.div
      className={`space-y-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <motion.label
          className="text-sm font-medium text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </motion.label>
      )}

      <motion.div
        className="relative overflow-hidden"
        whileFocus={{ scale: 1.005 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-destructive text-sm"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {success && !error && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-green-600 text-sm"
          >
            <CheckCircle className="w-3 h-3 flex-shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
