"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  className?: string
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Main Gallery */}
      <div className={`relative ${className}`}>
        {/* Main Image */}
        <motion.div
          className="relative h-96 rounded-2xl overflow-hidden cursor-zoom-in group"
          onClick={() => openLightbox(currentIndex)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={(images[currentIndex] && images[currentIndex].src) || "/placeholder.svg"}
                alt={(images[currentIndex] && images[currentIndex].alt) || ""}
                fill
                className="object-cover"
              />

              {/* Zoom Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-secondary/90 backdrop-blur-sm rounded-full p-3"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ZoomIn className="w-6 h-6 text-text" />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-secondary/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 text-text" />
              </motion.button>

              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5 text-text" />
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <motion.div
            className="flex gap-2 mt-4 overflow-x-auto pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {images.map((image, index) => (
              <motion.button
                key={index}
                className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex ? "border-accent shadow-lg" : "border-transparent hover:border-accent/50"
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                {index !== currentIndex && <div className="absolute inset-0 bg-black/30" />}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 bg-secondary/20 backdrop-blur-sm rounded-full p-2 text-text hover:bg-secondary/40 transition-colors z-10"
              onClick={() => setIsLightboxOpen(false)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Main Lightbox Image */}
            <motion.div
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={(images[lightboxIndex] && images[lightboxIndex].src) || "/placeholder.svg"}
                    alt={(images[lightboxIndex] && images[lightboxIndex].alt) || ""}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <motion.button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-secondary/10 backdrop-blur-sm rounded-full p-3 text-text hover:bg-secondary/20 transition-colors"
                    onClick={prevLightboxImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary/10 backdrop-blur-sm rounded-full p-3 text-text hover:bg-secondary/20 transition-colors"
                    onClick={nextLightboxImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Image Counter */}
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-secondary/10 backdrop-blur-sm rounded-full px-4 py-2 text-text text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {lightboxIndex + 1} / {images.length}
              </motion.div>

              {/* Caption */}
              {images[lightboxIndex] && images[lightboxIndex].caption && (
                <motion.div
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-secondary/10 backdrop-blur-sm rounded-lg px-4 py-2 text-text text-center max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {images[lightboxIndex].caption}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
