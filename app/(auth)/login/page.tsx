
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  async function handleGoogleLogin() {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    if (error) {
       setError(error.message)
       setIsLoading(false)
    }
  }


  return (
    <div className="bg-bg-surface border border-bg-border p-8 rounded-xl shadow-2xl backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-6 text-text-primary">Sign In</h2>
      
      {error && (
        <div className="bg-negative/10 text-negative p-3 rounded-md text-sm mb-4 border border-negative/20">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-bg-elevated border border-bg-border rounded-md px-3 py-2 text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-bg-elevated border border-bg-border rounded-md px-3 py-2 text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            required
          />
        </div>

        <Button className="w-full mt-2" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign In
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-bg-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-bg-surface px-2 text-text-tertiary">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline" 
        className="w-full border-bg-border text-text-primary hover:bg-bg-elevated"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        Google
      </Button>

      <div className="mt-6 text-center text-sm">
        <span className="text-text-secondary">Don't have an account? </span>
        <Link href="/signup" className="text-brand-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}
