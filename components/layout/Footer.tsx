import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="PurrfectSpa Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-slate-900">
                PurrfectSpa
              </span>
            </Link>
            <p className="text-slate-500 max-w-xs mb-6">
              Premium cat grooming & wellness. Because your feline companion deserves the best care.
            </p>
            <div className="flex gap-4 text-slate-400">
              <Link href="#" className="hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-primary-600 transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-primary-600 transition-colors">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-primary-600 transition-colors">Gallery</Link></li>
              <li><Link href="/booking" className="hover:text-primary-600 transition-colors">Book Now</Link></li>
              <li><Link href="/admin" className="hover:text-primary-600 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-slate-900 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>123 Meow Avenue</li>
              <li>Cat City, CC 12345</li>
              <li>hello@purrfectspa.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} PurrfectSpa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
