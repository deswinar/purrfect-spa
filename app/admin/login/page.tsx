"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { Cat, Lock } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { supabase } from "@/lib/supabase"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
    // if successful, the AdminAuthWrapper will automatically catch the SIGNED_IN event and redirect.
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-sm"
      >
        <div className="bg-primary-50 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-sm">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">Admin Portal</h1>
          <p className="mt-2 text-sm text-slate-600">Enter your credentials to manage PurrfectSpa</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@purrfectspa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
                  Authenticating...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Developer Demo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-primary-100 text-primary-600 hover:bg-primary-50"
                onClick={() => {
                  setEmail("admin@purrfectspa.com")
                  setPassword("Test123")
                }}
              >
                Fill Demo
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-accent-100 text-accent-600 hover:bg-accent-50"
                onClick={() => {
                  localStorage.setItem("purrfect_spa_demo_access", "true")
                  window.dispatchEvent(new Event("storage"))
                  router.push("/admin")
                }}
              >
                Bypass Login
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
