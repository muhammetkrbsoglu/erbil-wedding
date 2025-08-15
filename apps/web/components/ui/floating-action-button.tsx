"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Plus, Phone, Mail, MessageCircle } from "lucide-react"

interface FloatingAction {
  icon: React.ReactNode
  label: string
  onClick: () => void
  color?: string
}

const actions: FloatingAction[] = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Ara",
    onClick: () => window.open("tel:+905551234567"),
    color: "bg-green-500",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "E-posta",
    onClick: () => window.open("mailto:info@erbilwedding.com"),
    color: "bg-blue-500",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "WhatsApp",
    onClick: () => window.open("https://wa.me/905551234567"),
    color: "bg-green-600",
  },
]

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, staggerChildren: 0.05 }}
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                className={`flex items-center gap-3 ${action.color || "bg-accent"} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow group`}
                onClick={action.onClick}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                  {action.icon}
                </motion.div>
                <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        className="w-14 h-14 bg-accent text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  )
}
