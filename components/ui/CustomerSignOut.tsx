'use client'

import { createBrowserClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

export default function CustomerSignOut() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="mt-12 pt-8 border-t border-[#C9A84C]/10">
      <button
        onClick={handleSignOut}
        className="text-red-400 hover:text-red-300 text-sm 
                   transition-colors"
      >
        Sign out of my account
      </button>
    </div>
  )
}
