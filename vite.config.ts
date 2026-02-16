import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'api-middleware',
        configureServer(server) {
          console.log('API Middleware configured')
          console.log('R2 Config Check:', {
            endpoint: env.R2_ENDPOINT ? 'Present' : 'Missing',
            accessKey: env.R2_ACCESS_KEY_ID ? 'Present' : 'Missing',
            secretKey: env.R2_SECRET_ACCESS_KEY ? 'Present' : 'Missing',
            bucket: env.VITE_R2_BUCKET_NAME
          })

          // Define Public Endpoint with fallback
          const R2_PUBLIC_ENDPOINT = env.VITE_R2_PUBLIC_ENDPOINT || 'https://pub-d82739d73bef453284aab8c1efbb80b5.r2.dev'

          // Proxy Upload Endpoint (Bypasses CORS)
          server.middlewares.use('/api/proxy-upload', async (req, res, next) => {
            if (req.method === 'POST') {
              // Get headers
              const fileName = req.headers['x-filename'] as string
              const fileType = req.headers['x-filetype'] as string
              const category = (req.headers['x-category'] as string) || 'misc'

              if (!fileName || !fileType) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'Missing headers' }))
                return
              }

              const chunks: any[] = []
              req.on('data', chunk => chunks.push(chunk))
              req.on('end', async () => {
                try {
                  const fileBuffer = Buffer.concat(chunks)

                  const r2Client = new S3Client({
                    region: 'auto',
                    endpoint: env.R2_ENDPOINT,
                    credentials: {
                      accessKeyId: env.R2_ACCESS_KEY_ID || '',
                      secretAccessKey: env.R2_SECRET_ACCESS_KEY || '',
                    },
                  })

                  const sanitizedName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '')}`
                  const sanitizedCategory = category.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
                  const key = `products/${sanitizedCategory}/${sanitizedName}`

                  const command = new PutObjectCommand({
                    Bucket: env.VITE_R2_BUCKET_NAME,
                    Key: key,
                    Body: fileBuffer,
                    ContentType: fileType,
                  })

                  await r2Client.send(command)
                  console.log('File uploaded successfully via proxy to:', key)

                  const publicUrl = `${R2_PUBLIC_ENDPOINT}/products/${sanitizedCategory}/${sanitizedName}`

                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({
                    success: true,
                    publicUrl,
                    fileName: sanitizedName
                  }))
                } catch (error) {
                  console.error('Proxy Upload Error:', error)
                  res.statusCode = 500
                  res.end(JSON.stringify({ error: 'Failed', details: error instanceof Error ? error.message : String(error) }))
                }
              })
            } else {
              next()
            }
          })



          server.middlewares.use('/api/delete-file', async (req, res, next) => {
            if (req.method === 'POST') {
              let body = ''
              req.on('data', chunk => body += chunk)
              req.on('end', async () => {
                try {
                  const { fileKey } = JSON.parse(body)

                  const r2Client = new S3Client({
                    region: 'auto',
                    endpoint: env.R2_ENDPOINT,
                    credentials: {
                      accessKeyId: env.R2_ACCESS_KEY_ID || '',
                      secretAccessKey: env.R2_SECRET_ACCESS_KEY || '',
                    },
                  })

                  const command = new DeleteObjectCommand({
                    Bucket: env.VITE_R2_BUCKET_NAME,
                    Key: fileKey,
                  })

                  await r2Client.send(command)

                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: true }))
                } catch (error) {
                  console.error('API Error:', error)
                  res.statusCode = 500
                  res.end(JSON.stringify({ error: 'Failed' }))
                }
              })
            } else {
              next()
            }
          })
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
