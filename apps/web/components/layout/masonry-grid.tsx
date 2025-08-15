"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface MasonryGridProps {
  children: React.ReactNode[]
  columns?: number
  gap?: number
  className?: string
}

export function MasonryGrid({ children, columns = 3, gap = 16, className = "" }: MasonryGridProps) {
  const [columnHeights, setColumnHeights] = useState<number[]>([])
  const [itemPositions, setItemPositions] = useState<Array<{ x: number; y: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateLayout = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const columnWidth = (containerWidth - gap * (columns - 1)) / columns
      const heights = new Array(columns).fill(0)
      const positions: Array<{ x: number; y: number }> = []

      children.forEach((_, index) => {
        const shortestColumnIndex = heights.indexOf(Math.min(...heights))
        const x = shortestColumnIndex * (columnWidth + gap)
        const y = heights[shortestColumnIndex]

        positions.push({ x, y })

        // Estimate item height (you might want to measure actual heights)
        const estimatedHeight = 200 + Math.random() * 100
        heights[shortestColumnIndex] += estimatedHeight + gap
      })

      setColumnHeights(heights)
      setItemPositions(positions)
    }

    calculateLayout()
    window.addEventListener("resize", calculateLayout)
    return () => window.removeEventListener("resize", calculateLayout)
  }, [children, columns, gap])

  const containerHeight = Math.max(...columnHeights)

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: containerHeight }}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: itemPositions[index]?.x || 0,
            top: itemPositions[index]?.y || 0,
            width: `calc((100% - ${gap * (columns - 1)}px) / ${columns})`,
          }}
          variants={staggerItem}
          whileHover={{
            scale: 1.02,
            zIndex: 10,
            transition: { duration: 0.3 },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
