"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { Button } from "@/components/ui/Button"
import { Sparkles, Heart, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fef9f0] py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-sm font-medium text-accent-600">
                <Sparkles className="mr-2 h-4 w-4" />
                Premium Cat Grooming
              </div>
              <h1 className="font-heading text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-7xl">
                Purrfect Grooming for Your <span className="text-primary-500">Beloved Cat</span>
              </h1>
              <p className="max-w-[600px] text-lg text-slate-600 md:text-xl/relaxed">
                Book professional grooming treatments designed exclusively for your feline companion. Stress-free, gentle, and purrfect.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="rounded-full text-lg">
                <Link href="/booking">Book Grooming</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full text-lg">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-400 fill-red-400" />
                <span>Gentle Care</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent-500" />
                <span>Certified Groomers</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[500px] lg:max-w-none"
          >
            <div className="relative aspect-square w-full rounded-full bg-primary-100 p-8">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-300 animate-[spin_20s_linear_infinite]" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-8 border-white shadow-xl">
                <Image
                  src="https://picsum.photos/seed/catgrooming/800/800"
                  alt="Cute cat being groomed"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
              
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -right-4 top-1/4 rounded-2xl bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">5.0 Rating</p>
                    <p className="text-xs text-slate-500">Happy Cats</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
