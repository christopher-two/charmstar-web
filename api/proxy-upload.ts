/**
 * Vercel Serverless Function for R2 Proxy Upload
 * Handles direct file uploads to Cloudflare R2 (bypasses CORS).
 *
 * Endpoint: /api/proxy-upload
 * Method: POST
 * Headers:
 *   - x-filename: original file name
 *   - x-filetype: MIME type (e.g. image/jpeg)
 *   - x-category: product category (default: misc)
 * Body: raw binary file data
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const r2Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
})

export const config = {
    api: {
        bodyParser: false, // We need raw buffer, not parsed JSON
    },
}

export default async function handler(req: any, res: any) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-filename, x-filetype, x-category'
    )

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const fileName = req.headers['x-filename'] as string
    const fileType = req.headers['x-filetype'] as string
    const category = (req.headers['x-category'] as string) || 'misc'

    if (!fileName || !fileType) {
        return res.status(400).json({ error: 'Missing headers: x-filename and x-filetype are required' })
    }

    try {
        // Read raw body from request stream
        const chunks: Buffer[] = []
        await new Promise<void>((resolve, reject) => {
            req.on('data', (chunk: Buffer) => chunks.push(chunk))
            req.on('end', resolve)
            req.on('error', reject)
        })
        const fileBuffer = Buffer.concat(chunks)

        const sanitizedName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '')}`
        const sanitizedCategory = category.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
        const key = `products/${sanitizedCategory}/${sanitizedName}`

        const command = new PutObjectCommand({
            Bucket: process.env.VITE_R2_BUCKET_NAME,
            Key: key,
            Body: fileBuffer,
            ContentType: fileType,
        })

        await r2Client.send(command)
        console.log('File uploaded successfully via proxy to:', key)

        const R2_PUBLIC_ENDPOINT =
            process.env.VITE_R2_PUBLIC_ENDPOINT || 'https://pub-d82739d73bef453284aab8c1efbb80b5.r2.dev'
        const publicUrl = `${R2_PUBLIC_ENDPOINT}/products/${sanitizedCategory}/${sanitizedName}`

        return res.status(200).json({
            success: true,
            publicUrl,
            fileName: sanitizedName,
        })
    } catch (error) {
        console.error('Proxy Upload Error:', error)
        return res.status(500).json({
            error: 'Failed to upload file',
            details: error instanceof Error ? error.message : String(error),
        })
    }
}
