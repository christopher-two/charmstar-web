const { S3Client, PutBucketCorsCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
console.log('Loading env from:', envPath);
dotenv.config({ path: envPath });

console.log('Starting CORS fix script...');
console.log('Endpoint:', process.env.R2_ENDPOINT);
console.log('Key ID:', process.env.R2_ACCESS_KEY_ID ? '***' : 'Missing');

const client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const bucketName = process.env.VITE_R2_BUCKET_NAME || 'charmstar';

async function run() {
    try {
        console.log('Setting CORS for bucket:', bucketName);
        const corsRules = [
            {
                AllowedHeaders: ['*'],
                AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
                AllowedOrigins: ['*'],
                ExposeHeaders: ['ETag'],
                MaxAgeSeconds: 3000,
            },
        ];

        console.log('Sending PutBucketCorsCommand...');
        await client.send(new PutBucketCorsCommand({
            Bucket: bucketName,
            CORSConfiguration: {
                CORSRules: corsRules,
            },
        }));
        console.log('SUCCESS: CORS Configuration updated.');
    } catch (err) {
        console.error('ERROR:', err);
    }
}

run();
