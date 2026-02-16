/**
 * Vercel Serverless Function for R2 File Deletion
 * 
 * Endpoint: /api/delete-file
 * Method: POST
 * Body: { fileKey: string }
 */

import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

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
        const { fileKey } = req.body

        if (!fileKey) {
            return res.status(400).json({
                error: 'Missing required field: fileKey',
            })
        }

        const command = new DeleteObjectCommand({
            Bucket: process.env.VITE_R2_BUCKET_NAME,
            Key: fileKey,
        })

        await r2Client.send(command)

        return res.status(200).json({
            success: true,
            message: 'File deleted successfully',
        })
    } catch (error) {
        console.error('Error deleting file:', error)
        return res.status(500).json({
            error: 'Failed to delete file',
            message: error instanceof Error ? error.message : 'Unknown error',
        })
    }
}
