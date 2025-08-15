"use client"

import { forwardRef } from "react"
import { Button, type ButtonProps } from "./button"
import { cn } from "@/lib/utils"
import { useTouchFeedback } from "@/hooks/use-touch-feedback"

interface TouchButtonProps extends ButtonProps {
  hapticFeedback?: boolean
}

export const TouchButton = forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ className, hapticFeedback = true, children, ...props }, ref) => {
    const { handleTouchStart, handleTouchEnd, isPressed } = useTouchFeedback()

    const handleTouch = () => {
      if (hapticFeedback && "vibrate" in navigator) {
        navigator.vibrate(10) // Light haptic feedback
      }
    }

    return (
      <Button
        ref={ref}
        className={cn(
          "touch-target mobile-transition",
          "active:scale-95 active:shadow-sm",
          isPressed && "scale-95 shadow-sm",
          className,
        )}
        onTouchStart={(e) => {
          handleTouchStart()
          handleTouch()
          props.onTouchStart?.(e)
        }}
        onTouchEnd={(e) => {
          handleTouchEnd()
          props.onTouchEnd?.(e)
        }}
        {...props}
      >
        {children}
      </Button>
    )
  },
)

TouchButton.displayName = "TouchButton"
