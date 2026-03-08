"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "My Persian cat has never looked this fluffy! The de-shedding treatment is a miracle. Highly recommend PurrfectSpa.",
    author: "Sarah L.",
    role: "Cat Mom to Luna",
    avatar: "https://picsum.photos/seed/sarah/100/100",
  },
  {
    quote: "PurrfectSpa is the best grooming service ever! My usually anxious tabby was so relaxed when I picked him up.",
    author: "Daniel T.",
    role: "Cat Dad to Oliver",
    avatar: "https://picsum.photos/seed/daniel/100/100",
  },
  {
    quote: "The staff here truly understands cats. They handled my senior cat with such care and gentleness.",
    author: "Emily R.",
    role: "Cat Mom to Bella",
    avatar: "https://picsum.photos/seed/emily/100/100",
  },
]

export function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Happy Cats, Happy Owners
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-lg text-slate-600">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about their PurrfectSpa experience.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col rounded-3xl bg-slate-50 p-8 shadow-sm"
            >
              <div className="mb-6 flex gap-1 text-primary-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mb-8 flex-1 text-lg italic text-slate-700">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
