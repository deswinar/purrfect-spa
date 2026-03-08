"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { getGalleryImages, GalleryImage } from "@/lib/data"

const categories = ["All", "Before & After", "Spa Day", "Fluffy Clients"]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await getGalleryImages()
        setGalleryImages(data || [])
      } catch (error) {
        console.error("Failed to load gallery:", error)
      } finally {
        setLoading(false)
      }
    }
    loadGallery()
  }, [])

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)


  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4 text-center md:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
          >
            Our Happy Clients
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-[600px] text-lg text-slate-600"
          >
            Take a look at some of the beautiful transformations and relaxing spa moments at PurrfectSpa.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${activeCategory === category
                    ? "bg-primary-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry-ish Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredImages.map((image) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={image.id}
                className="group relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm"
              >
                <div className="aspect-[4/5] w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-heading text-lg font-bold text-white">{image.alt}</p>
                  <p className="text-sm text-slate-200">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
