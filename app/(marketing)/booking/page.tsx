"use client"

import { useState, useEffect, Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "motion/react"
import { CheckCircle2, CalendarHeart } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"

const bookingSchema = z.object({
  ownerName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  catName: z.string().min(1, "Cat's name is required"),
  catBreed: z.string().min(1, "Cat's breed is required"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  notes: z.string().optional(),
})

type BookingFormValues = z.infer<typeof bookingSchema>

function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get("service")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: preselectedService || "",
    }
  })

  useEffect(() => {
    if (preselectedService) {
      setValue("service", preselectedService)
    }
    if (searchParams.get("success") === "true") {
      setIsSubmitted(true)
    }
  }, [preselectedService, searchParams, setValue])

  const onSubmit = async (data: BookingFormValues) => {
    try {
      const resp = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await resp.json();
      if (result.success && result.paymentLink) {
        window.location.href = result.paymentLink;
      } else {
        setIsSubmitted(true);
      }
    } catch (e) {
      console.error(e);
      setIsSubmitted(true);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-accent-100 text-accent-500">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-slate-900">Booking Confirmed!</h2>
        <p className="mt-4 max-w-md text-lg text-slate-600">
          Thank you for choosing PurrfectSpa. We&apos;ll contact you shortly to confirm your appointment time.
        </p>
        <Button
          className="mt-8 rounded-full"
          onClick={() => window.location.href = "/booking"}
        >
          Book Another Session
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Owner Details */}
      <div className="space-y-6">
        <h3 className="font-heading text-xl font-semibold text-slate-900 border-b border-slate-100 pb-2">
          Owner Details
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ownerName">Full Name</Label>
            <Input
              id="ownerName"
              placeholder="Jane Doe"
              {...register("ownerName")}
              className={errors.ownerName ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.ownerName && <p className="text-sm text-red-500">{errors.ownerName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              {...register("phone")}
              className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* Cat Details */}
      <div className="space-y-6">
        <h3 className="font-heading text-xl font-semibold text-slate-900 border-b border-slate-100 pb-2">
          Cat Details
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="catName">Cat&apos;s Name</Label>
            <Input
              id="catName"
              placeholder="Luna"
              {...register("catName")}
              className={errors.catName ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.catName && <p className="text-sm text-red-500">{errors.catName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="catBreed">Breed</Label>
            <Input
              id="catBreed"
              placeholder="Persian, Tabby, etc."
              {...register("catBreed")}
              className={errors.catBreed ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.catBreed && <p className="text-sm text-red-500">{errors.catBreed.message}</p>}
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="space-y-6">
        <h3 className="font-heading text-xl font-semibold text-slate-900 border-b border-slate-100 pb-2">
          Appointment Details
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="service">Select Service</Label>
            <Select
              id="service"
              {...register("service")}
              className={errors.service ? "border-red-500 focus-visible:ring-red-500" : ""}
            >
              <option value="">Choose a package...</option>
              <option value="Basic Grooming">Basic Grooming ($45)</option>
              <option value="Full Spa Treatment">Full Spa Treatment ($85)</option>
              <option value="Anti-Flea Treatment">Anti-Flea Treatment ($60)</option>
              <option value="Kitten First Groom">Kitten First Groom ($35)</option>
              <option value="Senior Cat Care">Senior Cat Care ($75)</option>
            </Select>
            {errors.service && <p className="text-sm text-red-500">{errors.service.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                {...register("date")}
                className={errors.date ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
            </div>
            {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Special Notes or Requirements</Label>
          <Textarea
            id="notes"
            placeholder="Does your cat have any allergies, medical conditions, or behavioral quirks we should know about?"
            {...register("notes")}
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full text-lg h-14"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></span>
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <CalendarHeart className="h-5 w-5" />
            Book Grooming Session
          </span>
        )}
      </Button>
    </form>
  )
}

export default function BookingPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            >
              Book a Grooming Session
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-slate-600"
            >
              Fill out the form below to schedule your cat&apos;s spa day.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-white p-8 shadow-sm md:p-12"
          >
            <Suspense fallback={<div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-500"></div></div>}>
              <BookingForm />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
