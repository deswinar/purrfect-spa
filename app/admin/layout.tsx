"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Calendar, Users, Settings, LogOut } from "lucide-react"

import { supabase } from "@/lib/supabase"
import { AdminAuthWrapper } from "@/components/AdminAuthWrapper"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    localStorage.removeItem("purrfect_spa_demo_access")
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const isLoginPage = pathname === "/admin/login"

  return (
    <AdminAuthWrapper>
      {isLoginPage ? (
        children
      ) : (
        <div className="flex min-h-screen bg-slate-50">
          {/* Sidebar */}
          <aside className="w-64 border-r border-slate-200 bg-white">
            <div className="flex h-20 items-center border-b border-slate-100 px-6">
              <Link href="/" className="flex items-center gap-3">
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
            </div>
            <nav className="p-4 space-y-1">
              <Link href="/admin" className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${pathname === '/admin' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link href="/admin/bookings" className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${pathname === '/admin/bookings' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Calendar className="h-5 w-5" />
                Bookings
              </Link>
              <Link href="/admin/customers" className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${pathname === '/admin/customers' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Users className="h-5 w-5" />
                Customers
              </Link>
              <Link href="/admin/settings" className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${pathname === '/admin/settings' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
            <div className="absolute bottom-0 w-64 border-t border-slate-100 p-4 space-y-2">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700">
                <LogOut className="h-5 w-5" />
                Log Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
              <h1 className="font-heading text-2xl font-bold text-slate-900 capitalize">
                {pathname === '/admin' ? 'Dashboard' : pathname.replace('/admin/', '')}
              </h1>
              <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                  <Image src="https://picsum.photos/seed/admin/100/100" alt="Admin" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </header>
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      )}
    </AdminAuthWrapper>
  )
}

