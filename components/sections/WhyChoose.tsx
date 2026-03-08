"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { CheckCircle2, Heart, Shield, Sparkles } from "lucide-react"

const reasons = [
  {
    title: "Cat-Exclusive Environment",
    description: "No barking dogs. Just a calm, quiet space designed specifically for feline comfort.",
    icon: Heart,
  },
  {
    title: "Certified Feline Master Groomers",
    description: "Our staff is specially trained in cat handling and grooming techniques.",
    icon: Shield,
  },
  {
    title: "Premium Organic Products",
    description: "We use only the highest quality, cat-safe shampoos and conditioners.",
    icon: Sparkles,
  },
  {
    title: "Stress-Free Handling",
    description: "We never use sedation. We use gentle handling to keep your cat relaxed.",
    icon: CheckCircle2,
  },
]

export function WhyChoose() {
  return (
    <section className="bg-primary-50 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[500px] w-full overflow-hidden rounded-3xl"
          >
            <Image
              src="https://picsum.photos/seed/catspa/800/1000"
              alt="Relaxed cat in a spa"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-6 backdrop-blur-sm">
              <p className="font-heading text-xl font-bold text-slate-900">
                &quot;The most relaxing experience for my anxious cat.&quot;
              </p>
              <p className="mt-2 text-sm text-slate-600">— Happy Cat Owner</p>
            </div>
          </motion.div>
          
          <div className="space-y-10">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Why Choose PurrfectSpa?
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                We understand that cats aren&apos;t just small dogs. They require specialized care, a quiet environment, and expert handling.
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-500 shadow-sm">
                    <reason.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">{reason.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
