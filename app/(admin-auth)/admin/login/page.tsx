'use client'

import { createBrowserClient } from '@/lib/supabase-client'
import { useState } from 'react'
import { LockKeyhole, Mail } from 'lucide-react'

type Step = 'form' | 'sent'

export default function AdminLoginPage() {
  const [step, setStep] = useState<Step>('form')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createBrowserClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      console.error('Supabase Magic Link Error:', error)
      
      // Check if it's a rate limit error
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

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center 
                    justify-center p-4">
      <div className="w-full max-w-md bg-[#0D2137] rounded-xl p-8 
                      border border-[#C9A84C]/30 shadow-2xl">

        {/* Logo */}
        <div className="text-center mb-8">
          <LockKeyhole className="mx-auto mb-4 text-[#C9A84C]" size={40} />
          <h1 className="font-playfair text-3xl text-[#C9A84C] mb-1">
            Raj Ratnam
          </h1>
          <p className="text-[#F5F0E8]/60 text-sm">Admin Portal</p>
        </div>

        {/* Step 1: Email form */}
        {step === 'form' && (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <label className="block text-[#F5F0E8]/70 text-sm mb-2">
                Admin Email Address
              </label>
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
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))}
              className="w-full flex items-center justify-center gap-2
                         bg-[#C9A84C] hover:bg-[#B8962F] text-[#0D1B2A]
                         font-medium py-3 rounded-lg transition-all
                         duration-200 disabled:opacity-60 
                         disabled:cursor-not-allowed"
            >
              <Mail size={18} />
              {isLoading 
                ? 'Sending...' 
                : (email.length > 0 && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
                    ? 'Enter valid email address' 
                    : 'Send Magic Link')}
            </button>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30
                              rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <p className="text-[#F5F0E8]/30 text-xs text-center pt-2">
              A secure login link will be sent to your email.
              No password needed.
            </p>
          </form>
        )}

        {/* Step 2: Confirmation */}
        {step === 'sent' && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-full
                            flex items-center justify-center mx-auto">
              <Mail size={32} className="text-[#C9A84C]" />
            </div>
            <h2 className="text-[#F5F0E8] font-medium text-lg">
              Check your inbox!
            </h2>
            <p className="text-[#F5F0E8]/60 text-sm leading-relaxed">
              We sent a secure login link to{' '}
              <span className="text-[#C9A84C]">{email}</span>.
              Click the link to access the admin dashboard.
            </p>
            <p className="text-[#F5F0E8]/30 text-xs">
              Link expires in 1 hour. Check your spam folder
              if you don't see it.
            </p>
            <button
              onClick={() => { setStep('form'); setError(null) }}
              className="text-[#C9A84C]/60 hover:text-[#C9A84C] 
                         text-sm transition-colors underline"
            >
              Try a different email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
