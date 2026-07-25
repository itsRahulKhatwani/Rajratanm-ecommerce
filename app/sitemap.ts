import { prisma } from '@/lib/prisma'
import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                  'https://rajratnam.com'

  // Static pages — always included, no DB needed
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    }
  ]

  // Dynamic pages — wrapped in try/catch
  // If DB is unreachable during build, return static pages only
  let productPages: MetadataRoute.Sitemap = []
  let blogPages: MetadataRoute.Sitemap = []

  try {
    const products = await prisma.product.findMany({
      select: { slug: true, updatedAt: true }
    })
    productPages = products.map(product => ({
      url: `${baseUrl}/shop/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  } catch {
    // DB unreachable during build — skip dynamic product URLs
    console.warn('Sitemap: Could not fetch products from DB')
  }

  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    })
    blogPages = blogs.map(blog => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  } catch {
    // DB unreachable during build — skip dynamic blog URLs
    console.warn('Sitemap: Could not fetch blogs from DB')
  }

  return [...staticPages, ...productPages, ...blogPages]
}
