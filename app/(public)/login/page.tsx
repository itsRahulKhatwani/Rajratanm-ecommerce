'use client'

import { createBrowserClient } from '@/lib/supabase-client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, Gem } from 'lucide-react'

type Step = 'form' | 'sent'

export default function CustomerLoginPage() {
  const [step, setStep] = useState<Step>('form')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient()

  // Get redirect URL from query params
  const redirectTo = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('redirect') || '/account'
    : '/account'

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`
      }
    })

    if (error) {
      if (error.message.toLowerCase().includes('rate limit')) {
        setError('Email rate limit reached (3 per hour). Please try again after 1 hour.')
      } else {
        setError(`Failed: ${error.message}`)
      }
      setIsLoading(false)
      return
    }

    setStep('sent')
    setIsLoading(false)
  }

  const isEmailValid = email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isSubmitDisabled = isLoading || !email || !isEmailValid

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center 
                    justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Gem className="mx-auto mb-3 text-[#C9A84C]" size={36} />
          <h1 className="font-playfair text-3xl text-[#C9A84C]">
            Raj Ratanm
          </h1>
          <p className="text-[#F5F0E8]/60 mt-1">
            Sign in to track your orders
          </p>
        </div>

        <div className="bg-[#0D2137] rounded-xl p-8 
                        border border-[#C9A84C]/20 shadow-2xl">

          {/* Step: Magic link email form */}
          {step === 'form' && (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <h2 className="text-[#F5F0E8] font-medium">
                Enter your email
              </h2>
              <p className="text-[#F5F0E8]/50 text-sm mb-4">
                We'll send you a secure magic link — no password needed.
              </p>

              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-[#0D1B2A] border border-[#C9A84C]/30
                           focus:border-[#C9A84C] text-[#F5F0E8] 
                           placeholder-[#F5F0E8]/30 rounded-lg px-4 py-3
                           outline-none transition-colors"
              />

              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full flex items-center justify-center gap-2
                           bg-[#C9A84C] hover:bg-[#B8962F] 
                           text-[#0D1B2A] font-medium py-3 rounded-lg
                           transition-all duration-200 disabled:opacity-60
                           disabled:cursor-not-allowed"
              >
                <Mail size={18} />
                {isLoading 
                  ? 'Sending...' 
                  : (email.length > 0 && !isEmailValid 
                      ? 'Enter valid email address' 
                      : 'Send Magic Link')}
              </button>

              {error && (
                <p className="text-red-400 text-sm text-center pt-2">{error}</p>
              )}
            </form>
          )}

          {/* Step: Magic link sent confirmation */}
          {step === 'sent' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-full 
                              flex items-center justify-center mx-auto">
                <Mail size={32} className="text-[#C9A84C]" />
              </div>
              <h2 className="text-[#F5F0E8] font-medium text-lg">
                Check your inbox!
              </h2>
              <p className="text-[#F5F0E8]/60 text-sm">
                We sent a magic link to{' '}
                <span className="text-[#C9A84C]">{email}</span>.
                Click the link in the email to sign in.
              </p>
              <p className="text-[#F5F0E8]/40 text-xs">
                Didn't receive it? Check your spam folder or{' '}
                <button
                  type="button"
                  onClick={() => { 
                    setStep('form')
                    setError(null) 
                  }}
                  className="text-[#C9A84C] underline hover:text-[#B8962F] transition-colors"
                >
                  try again
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Back to shop */}
        <p className="text-center text-[#F5F0E8]/40 text-sm mt-6">
          <Link href="/shop" className="hover:text-[#C9A84C] transition-colors">
            ← Continue browsing without signing in
          </Link>
        </p>
      </div>
    </div>
  )
}
