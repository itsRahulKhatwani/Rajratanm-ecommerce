import type { Metadata } from 'next'
import ContactClient from '@/components/ui/ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Raj Ratnam. We\'re here to help ' +
    'you find the perfect gemstone or answer any questions.',
}

export default function ContactPage() {
  return <ContactClient />
}
