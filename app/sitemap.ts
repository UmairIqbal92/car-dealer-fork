import { MetadataRoute } from 'next'
import pool from '@/lib/db'
import { seoConfig } from '@/lib/seo-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = seoConfig.siteUrl

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/vehicles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/export`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  let vehiclePages: MetadataRoute.Sitemap = []
  
  try {
    const result = await pool.query(
      'SELECT id, updated_at FROM vehicles WHERE status = $1 ORDER BY updated_at DESC',
      ['available']
    )
    
    vehiclePages = result.rows.map((vehicle) => ({
      url: `${baseUrl}/vehicles/${vehicle.id}`,
      lastModified: vehicle.updated_at || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching vehicles for sitemap:', error)
  }

  let brandPages: MetadataRoute.Sitemap = []
  
  try {
    const result = await pool.query('SELECT DISTINCT make FROM vehicles WHERE status = $1', ['available'])
    
    brandPages = result.rows.map((row) => ({
      url: `${baseUrl}/vehicles?make=${encodeURIComponent(row.make)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error fetching brands for sitemap:', error)
  }

  return [...staticPages, ...vehiclePages, ...brandPages]
}
