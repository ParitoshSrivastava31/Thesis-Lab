
"use client"

import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Loader2 } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      setSuccess(true)
      setIsLoading(false)
    }
  }


  if (success) {
    return (
      <div className="bg-bg-surface border border-bg-border p-8 rounded-xl shadow-2xl backdrop-blur-sm text-center">
        <h2 className="text-xl font-bold mb-4 text-text-primary">Check your email</h2>
        <p className="text-text-secondary mb-6">
          We've sent a confirmation link to <strong>{email}</strong>.
        </p>
        <Link href="/login">
            <Button variant="outline" className="w-full">
                Back to Sign In
            </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-bg-surface border border-bg-border p-8 rounded-xl shadow-2xl backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-6 text-text-primary">Create Account</h2>
      
      {error && (
        <div className="bg-negative/10 text-negative p-3 rounded-md text-sm mb-4 border border-negative/20">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
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
            minLength={6}
          />
        </div>

        <Button className="w-full mt-2" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign Up
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-text-secondary">Already have an account? </span>
        <Link href="/login" className="text-brand-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}
