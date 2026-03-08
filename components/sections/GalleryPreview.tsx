"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/Button"

const images = [
  "https://picsum.photos/seed/cat1/600/600",
  "https://picsum.photos/seed/cat2/600/600",
  "https://picsum.photos/seed/cat3/600/600",
  "https://picsum.photos/seed/cat4/600/600",
  "https://picsum.photos/seed/cat5/600/600",
  "https://picsum.photos/seed/cat6/600/600",
]

export function GalleryPreview() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Before & After
            </h2>
            <p className="mt-4 max-w-[600px] text-lg text-slate-600">
              See the amazing transformations of our furry clients.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8">
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-3xl shadow-sm ${index === 0 || index === 3 ? 'aspect-square' : 'aspect-[4/3]'}`}
            >
              <Image
                src={src}
                alt="Cat grooming gallery image"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
