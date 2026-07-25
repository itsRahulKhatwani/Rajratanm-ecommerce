import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'https://rajratnam.com'
  ),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  title: {
    default: 'Raj Ratnam — Precious Stones & Healing Crystals',
    template: '%s | Raj Ratnam'
  },
  description: 'Ethically sourced precious stones, semi-precious ' +
    'gemstones, healing crystals, and artificial jewelry — ' +
    'handpicked from India\'s finest mines.',
  keywords: [
    'precious stones India',
    'gemstones online',
    'healing crystals',
    'semi precious stones',
    'neelam stone',
    'blue sapphire India',
    'rose quartz',
    'amethyst',
    'artificial jewelry India',
    'Raj Ratnam',
    'रत्न',
    'नवरत्न',
    'हीलिंग क्रिस्टल'
  ],
  authors: [{ name: 'Raj Ratnam' }],
  creator: 'Raj Ratnam',
  publisher: 'Raj Ratnam',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: 'hi_IN',
    siteName: 'Raj Ratnam',
    title: 'Raj Ratnam — Precious Stones & Healing Crystals',
    description: 'Ethically sourced precious stones, healing ' +
      'crystals, and jewelry from India\'s finest mines.',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Raj Ratnam — Precious Stones & Healing Crystals'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raj Ratnam — Precious Stones & Healing Crystals',
    description: 'Ethically sourced precious stones and healing ' +
      'crystals from India.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-navy text-ivory font-inter antialiased">
        {children}
      </body>
    </html>
  )
}
