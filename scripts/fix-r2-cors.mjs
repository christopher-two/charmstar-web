import { S3Client, GetBucketCorsCommand, PutBucketCorsCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
    region: 'auto',
    endpoint: 'https://1827203a2c62ad3b7a9aaace51eb44b7.r2.cloudflarestorage.com',
    credentials: {
        accessKeyId: '058ef214e945f8ad406e0bc2241f3341',
        secretAccessKey: '8de4e1976e680284cfb75422afdab02900e1d959ab020c799cb3286b3bf45aa2',
    },
});

const bucketName = 'charmstar-products-local';

async function checkCors() {
    try {
        console.log('Checking CORS for bucket:', bucketName);
        const data = await client.send(new GetBucketCorsCommand({ Bucket: bucketName }));
        console.log('Current CORS Configuration:', JSON.stringify(data.CORSRules, null, 2));
    } catch (err) {
        console.log('Error getting CORS (might be empty):', err.message);
    }
}

async function setCors() {
    try {
        console.log('Setting CORS for bucket:', bucketName);
        const corsRules = [
            {
                AllowedHeaders: ['*'],
                AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
                AllowedOrigins: ['*'], // For development, allow all. In prod, restrict to domain.
                ExposeHeaders: ['ETag'],
                MaxAgeSeconds: 3000,
            },
        ];

        await client.send(new PutBucketCorsCommand({
            Bucket: bucketName,
            CORSConfiguration: {
                CORSRules: corsRules,
            },
        }));
        console.log('CORS Configuration updated correctly.');
    } catch (err) {
        console.error('Error setting CORS:', err);
    }
}

async function run() {
    await checkCors();
    await setCors();
    await checkCors();
}

run();
