"use client"

import type React from "react"

import { forwardRef } from "react"
import { Input, type InputProps } from "./input"
import { Textarea } from "./textarea"
import { cn } from "@/lib/utils"

// Mobile-optimized input with proper keyboard types
interface MobileInputProps extends InputProps {
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "decimal" | "search"
}

export const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, inputMode, type, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type={type}
        inputMode={inputMode}
        className={cn(
          "touch-target mobile-transition",
          "text-base", // Prevent zoom on iOS
          "focus:ring-2 focus:ring-accent focus:border-accent",
          className,
        )}
        {...props}
      />
    )
  },
)

MobileInput.displayName = "MobileInput"

// Mobile-optimized textarea
interface MobileTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const MobileTextarea = forwardRef<HTMLTextAreaElement, MobileTextareaProps>(({ className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      className={cn(
        "touch-target mobile-transition",
        "text-base min-h-[120px]", // Prevent zoom on iOS, adequate height
        "focus:ring-2 focus:ring-accent focus:border-accent",
        "resize-none", // Disable resize on mobile
        className,
      )}
      {...props}
    />
  )
})

MobileTextarea.displayName = "MobileTextarea"

// Click-to-call phone number component
interface PhoneNumberProps {
  number: string
  displayNumber?: string
  className?: string
}

export function PhoneNumber({ number, displayNumber, className }: PhoneNumberProps) {
  const cleanNumber = number.replace(/\D/g, "")

  return (
    <a
      href={`tel:${cleanNumber}`}
      className={cn(
        "inline-flex items-center touch-target mobile-transition",
        "text-accent hover:text-accent/80 font-medium",
        "active:scale-95",
        className,
      )}
    >
      {displayNumber || number}
    </a>
  )
}
