import Image from "next/image"
import Link from "next/link"
import { Cat, LayoutDashboard, Calendar, Users, Settings, LogOut } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
              <Cat className="h-5 w-5" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-slate-900">
              PurrfectSpa
            </span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 rounded-xl bg-primary-50 px-4 py-3 text-sm font-medium text-primary-600">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Calendar className="h-5 w-5" />
            Bookings
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Users className="h-5 w-5" />
            Customers
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-slate-100 p-4">
          <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600">
            <LogOut className="h-5 w-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          <h1 className="font-heading text-2xl font-bold text-slate-900">Dashboard</h1>
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
  )
}
