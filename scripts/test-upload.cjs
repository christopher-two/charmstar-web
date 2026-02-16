const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
console.log('Loading env from:', envPath);
dotenv.config({ path: envPath });

console.log('Testing Server-Side Upload with new credentials...');

const client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const bucketName = process.env.VITE_R2_BUCKET_NAME || 'charmstar';
const key = 'test-server-upload-new-creds.txt';

async function run() {
    try {
        console.log('Uploading file to:', key);
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: 'Hello from server-side upload script with NEW CREDS!',
            ContentType: 'text/plain',
        }));
        console.log('SUCCESS: File uploaded successfully.');

        // Also print the public URL if possible so we can manually verify
        // But we know VITE_R2_PUBLIC_ENDPOINT is missing from env, so we can't construct it easily here
        // unless we hardcode the one we saw earlier.
        console.log('File should be available at public URL if configured.');
    } catch (err) {
        console.error('ERROR:', err);
    }
}

run();
