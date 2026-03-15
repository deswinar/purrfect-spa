"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { Cat, LayoutDashboard, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
            <Cat className="h-6 w-6" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
            PurrfectSpa
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-600",
                pathname === link.href ? "text-primary-600" : "text-slate-600"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="hidden md:flex gap-2 text-slate-500 hover:text-primary-600 transition-colors">
              <Link href="/admin">
                <LayoutDashboard className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/booking">Book Grooming</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-primary-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-slate-100 bg-white px-4 py-6 shadow-lg"
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block text-lg font-medium transition-colors",
                  pathname === link.href ? "text-primary-600" : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Button asChild variant="outline" className="w-full rounded-full gap-2 text-slate-600 border-slate-200">
                <Link href="/admin">
                  <LayoutDashboard className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              </Button>
              <Button asChild className="w-full rounded-full">
                <Link href="/booking">Book Grooming</Link>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
