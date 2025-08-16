"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface SwipeGalleryProps {
  images: Array<{
    src: string
    alt: string
  }>
  className?: string
}

export function SwipeGallery({ images, className }: SwipeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
  setTouchEnd(null)
  if (!e.targetTouches || e.targetTouches.length === 0) return
  const t = e.targetTouches[0]
  if (!t) return
  setTouchStart(t.clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
  if (!e.targetTouches || e.targetTouches.length === 0) return
  const t = e.targetTouches[0]
  if (!t) return
  setTouchEnd(t.clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* Main Gallery */}
      <div
        ref={containerRef}
        className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-muted"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons - Hidden on mobile, shown on desktop */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white hidden md:flex touch-target"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white hidden md:flex touch-target"
          onClick={goToNext}
          disabled={currentIndex === images.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200 touch-target",
              "min-w-[44px] min-h-[44px] flex items-center justify-center", // Touch target size
              currentIndex === index ? "bg-accent" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
            )}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          >
            <div className={cn("w-2 h-2 rounded-full", currentIndex === index ? "bg-primary" : "bg-current")} />
          </button>
        ))}
      </div>

      {/* Swipe Hint for Mobile */}
      <div className="md:hidden text-center mt-2">
        <p className="text-xs text-muted-foreground">Swipe left or right to browse images</p>
      </div>
    </div>
  )
}
