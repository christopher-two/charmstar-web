import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const r2Client = new S3Client({
  region: 'auto',
  endpoint: import.meta.env.VITE_R2_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY,
  },
})

export const uploadImageToR2 = async (
  file: File,
  fileName: string
): Promise<string> => {
  try {
    const buffer = await file.arrayBuffer()

    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_R2_BUCKET_NAME,
      Key: `products/${fileName}`,
      Body: buffer,
      ContentType: file.type,
    })

    await r2Client.send(command)

    // Retorna la URL pública
    return `${import.meta.env.VITE_R2_PUBLIC_ENDPOINT}/products/${fileName}`
  } catch (error) {
    console.error('Error uploading to R2:', error)
    throw error
  }
}

export default r2Client
