/**
 * Vercel Serverless Function for R2 Pre-signed URL Generation
 * This function generates a pre-signed URL for uploading files to Cloudflare R2
 * 
 * Endpoint: /api/upload-url
 * Method: POST
 * Body: { fileName: string, fileType: string }
 * 
 * Environment Variables Used (PRIVATE - server only):
 * - R2_ENDPOINT
 * - R2_ACCESS_KEY_ID
 * - R2_SECRET_ACCESS_KEY
 * - VITE_R2_BUCKET_NAME (public)
 * - VITE_R2_PUBLIC_ENDPOINT (public)
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { fileName, fileType, category = 'misc' } = req.body

    if (!fileName || !fileType) {
      return res.status(400).json({
        error: 'Missing required fields: fileName, fileType',
      })
    }

    // Sanitize filename and category
    const sanitizedName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const sanitizedCategory = category.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()

    const key = `products/${sanitizedCategory}/${sanitizedName}`

    const command = new PutObjectCommand({
      Bucket: process.env.VITE_R2_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    })

    // Generate pre-signed URL valid for 1 hour
    const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 })

    // Return URL and public URL
    const publicUrl = `${process.env.VITE_R2_PUBLIC_ENDPOINT}/products/${sanitizedCategory}/${sanitizedName}`

    return res.status(200).json({
      uploadUrl: url,
      publicUrl: publicUrl,
      fileName: sanitizedName,
    })
  } catch (error) {
    console.error('Error generating upload URL:', error)
    return res.status(500).json({
      error: 'Failed to generate upload URL',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
