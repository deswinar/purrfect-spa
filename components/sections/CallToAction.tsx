"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/Button"
import { CalendarHeart } from "lucide-react"

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-primary-500 py-24">
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cats" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M20 20 Q 30 10 40 20 Q 50 30 60 20 Q 70 10 80 20 L 80 80 L 20 80 Z" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cats)" />
        </svg>
      </div>
      
      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[800px] flex-col items-center text-center"
        >
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
            <CalendarHeart className="h-10 w-10" />
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Ready to Pamper Your Cat?
          </h2>
          <p className="mt-6 max-w-[600px] text-xl text-primary-50">
            Book your appointment today and give your feline friend the spa day they deserve.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild className="rounded-full bg-white text-primary-600 hover:bg-primary-50 text-lg">
              <Link href="/booking">Book Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full border-white text-white hover:bg-white/10 text-lg">
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
