'use client'

import { createBrowserClient } from '@/lib/supabase-client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, Gem } from 'lucide-react'

type Step = 'options' | 'magic-link' | 'magic-link-sent'

export default function CustomerLoginPage() {
  const [step, setStep] = useState<Step>('options')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient()

  // Get redirect URL from query params
  const redirectTo = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('redirect') || '/account'
    : '/account'

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`
      }
    })
    if (error) {
      setError('Google sign-in failed. Please try again.')
      setIsLoading(false)
    }
  }

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
      setError('Failed to send link. Please check your email and try again.')
      setIsLoading(false)
      return
    }

    setStep('magic-link-sent')
    setIsLoading(false)
  }

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

          {/* Step: Choose login method */}
          {step === 'options' && (
            <div className="space-y-4">
              <h2 className="text-[#F5F0E8] font-medium text-center mb-6">
                Choose how to sign in
              </h2>

              {/* Google */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3
                           bg-white hover:bg-gray-100 text-gray-800
                           font-medium py-3 px-4 rounded-lg
                           transition-all duration-200 disabled:opacity-60"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-[#C9A84C]/20" />
                <span className="text-[#F5F0E8]/40 text-xs">or</span>
                <div className="flex-1 h-px bg-[#C9A84C]/20" />
              </div>

              {/* Magic Link option */}
              <button
                onClick={() => setStep('magic-link')}
                className="w-full flex items-center justify-center gap-2
                           border border-[#C9A84C]/40 text-[#C9A84C]
                           hover:bg-[#C9A84C]/10 font-medium py-3 px-4 
                           rounded-lg transition-all duration-200"
              >
                <Mail size={18} />
                Continue with Email Link
              </button>

              {error && (
                <p className="text-red-400 text-sm text-center mt-3">
                  {error}
                </p>
              )}
            </div>
          )}

          {/* Step: Magic link email form */}
          {step === 'magic-link' && (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <button
                type="button"
                onClick={() => { setStep('options'); setError(null) }}
                className="text-[#C9A84C]/60 hover:text-[#C9A84C] 
                           text-sm mb-2 flex items-center gap-1"
              >
                ← Back
              </button>

              <h2 className="text-[#F5F0E8] font-medium">
                Enter your email
              </h2>
              <p className="text-[#F5F0E8]/50 text-sm">
                We'll send you a magic link — no password needed.
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
                disabled={isLoading || !email}
                className="w-full bg-[#C9A84C] hover:bg-[#B8962F] 
                           text-[#0D1B2A] font-medium py-3 rounded-lg
                           transition-all duration-200 disabled:opacity-60"
              >
                {isLoading ? 'Sending...' : 'Send Magic Link'}
              </button>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
            </form>
          )}

          {/* Step: Magic link sent confirmation */}
          {step === 'magic-link-sent' && (
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
                  onClick={() => { 
                    setStep('magic-link')
                    setError(null) 
                  }}
                  className="text-[#C9A84C] underline"
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
