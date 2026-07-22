import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                  'https://rajratnam.com'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/api/',
          '/auth/',
          '/account'
        ]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
