"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { CheckCircle2, Scissors, Droplets, Bug } from "lucide-react"

const services = [
  {
    title: "Basic Grooming",
    description: "Essential care to keep your cat clean and comfortable.",
    price: "$45",
    icon: Droplets,
    features: ["Bath with premium shampoo", "Nail trimming", "Ear cleaning", "Gentle brushing"],
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Full Spa Treatment",
    description: "The ultimate pampering session for your feline friend.",
    price: "$85",
    icon: Scissors,
    features: ["Everything in Basic", "De-shedding treatment", "Deep conditioning", "Blow dry & fur styling"],
    color: "bg-primary-100 text-primary-600",
    popular: true,
  },
  {
    title: "Anti-Flea Treatment",
    description: "Safe and effective flea removal and prevention.",
    price: "$60",
    icon: Bug,
    features: ["Flea bath", "Tick removal", "Soothing skin treatment", "Preventative application"],
    color: "bg-accent-100 text-accent-600",
  },
]

export function ServicesPreview() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Our Grooming Packages
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-lg text-slate-600">
            Choose the perfect spa day for your cat. We use only premium, cat-safe products.
          </p>
        </div>
        
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
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">{service.price}</span>
                  </div>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-500" />
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
        
        <div className="mt-16 text-center">
          <Button asChild variant="ghost" className="rounded-full text-primary-600">
            <Link href="/services">View all services &rarr;</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
