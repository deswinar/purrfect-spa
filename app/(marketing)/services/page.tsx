"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import * as Icons from "lucide-react"

import { getServices, Service } from "@/lib/data"

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices()
        setServices(data || [])
      } catch (error) {
        console.error("Failed to load services:", error)
      } finally {
        setLoading(false)
      }
    }
    loadServices()
  }, [])

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4 text-center md:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
          >
            Our Grooming Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-[600px] text-lg text-slate-600"
          >
            From basic baths to full spa days, we offer a range of services tailored to your cat&apos;s specific needs and temperament.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`relative flex h-full flex-col overflow-hidden ${service.popular ? 'border-primary-500 shadow-md ring-1 ring-primary-500' : ''}`}>
                  {service.popular && (
                    <div className="absolute right-0 top-0 rounded-bl-2xl bg-primary-500 px-4 py-1 text-xs font-bold text-white">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${service.color}`}>
                      {/* @ts-ignore */}
                      {Icons[service.icon] ? (
                        /* @ts-ignore */
                        (() => { const IconTag = Icons[service.icon]; return <IconTag className="h-6 w-6" /> })()
                      ) : (
                        <Icons.Droplets className="h-6 w-6" />
                      )}
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-slate-900">{service.price}</span>
                    </div>
                    <ul className="space-y-3">
                      {typeof service.features === 'string'
                        ? JSON.parse(service.features).map((feature: string) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Icons.CheckCircle2 className="h-5 w-5 shrink-0 text-accent-500" />
                            <span className="text-slate-600">{feature}</span>
                          </li>
                        )) : service.features.map((feature: string) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Icons.CheckCircle2 className="h-5 w-5 shrink-0 text-accent-500" />
                            <span className="text-slate-600">{feature}</span>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full rounded-full" variant={service.popular ? "default" : "outline"}>
                      <Link href={`/booking?service=${encodeURIComponent(service.title)}`}>
                        Book Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A La Carte Add-ons
            </h2>
            <p className="mt-4 text-lg text-slate-600">Customize your cat&apos;s spa day with these extras.</p>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="divide-y divide-slate-100">
              {[
                { name: "Teeth Brushing", price: "$15", desc: "Enzymatic toothpaste application" },
                { name: "Nail Caps Application", price: "$25", desc: "Soft claws applied to front paws" },
                { name: "Lion Cut", price: "$40", desc: "Full body shave leaving mane, boots, and tail tip" },
                { name: "De-matting", price: "$20+", desc: "Gentle removal of severe mats (price varies by severity)" },
              ].map((addon) => (
                <div key={addon.name} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                  <div>
                    <h3 className="font-bold text-slate-900">{addon.name}</h3>
                    <p className="text-sm text-slate-500">{addon.desc}</p>
                  </div>
                  <div className="font-heading text-xl font-bold text-primary-600">{addon.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section >
    </div >
  )
}
