"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login")
      } else if (session && pathname === "/admin/login") {
        router.push("/admin")
      } else {
        setIsAuthenticated(!!session)
        setIsLoading(false)
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" && pathname !== "/admin/login") {
        router.push("/admin/login")
      } else if (event === "SIGNED_IN" && pathname === "/admin/login") {
        router.push("/admin")
      } else {
        setIsAuthenticated(!!session)
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [pathname, router])

  if (isLoading && pathname !== "/admin/login") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-500"></div>
          <p className="text-slate-500">Verifying access...</p>
        </div>
      </div>
    )
  }

  // If we're on the login page, just render it (it doesn't need the sidebar layout wrapper)
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return isAuthenticated ? <>{children}</> : null
}
