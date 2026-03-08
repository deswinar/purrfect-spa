import { Hero } from "@/components/sections/Hero"
import { ServicesPreview } from "@/components/sections/ServicesPreview"
import { WhyChoose } from "@/components/sections/WhyChoose"
import { GalleryPreview } from "@/components/sections/GalleryPreview"
import { Testimonials } from "@/components/sections/Testimonials"
import { CallToAction } from "@/components/sections/CallToAction"

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyChoose />
      <GalleryPreview />
      <Testimonials />
      <CallToAction />
    </>
  )
}
