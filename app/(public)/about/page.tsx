import type { Metadata } from 'next'
import AboutClient from '@/components/ui/AboutClient'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Raj Ratnam — our story, our sourcing ' +
    'ethics, and our commitment to authentic precious stones ' +
    'and healing crystals.',
}

export default function AboutPage() {
  return <AboutClient />
}
