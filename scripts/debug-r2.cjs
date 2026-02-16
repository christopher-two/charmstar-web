const { S3Client, ListBucketsCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
console.log('Loading env from:', envPath);
dotenv.config({ path: envPath });

const endpoint = process.env.R2_ENDPOINT;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.VITE_R2_BUCKET_NAME;

console.log('Debug Configuration:');
console.log('Endpoint:', endpoint);
console.log('AccessKey:', accessKeyId ? '***' + accessKeyId.slice(-4) : 'Missing');
console.log('SecretKey:', secretAccessKey ? '***' + secretAccessKey.slice(-4) : 'Missing');
console.log('Bucket:', bucketName);

const client = new S3Client({
    region: 'auto',
    endpoint: endpoint,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});

async function run() {
    try {
        console.log('\n1. Testing ListBuckets...');
        const data = await client.send(new ListBucketsCommand({}));
        console.log('Buckets found:', data.Buckets?.map(b => b.Name).join(', '));

        if (!data.Buckets?.find(b => b.Name === bucketName)) {
            console.error(`\nCRITICAL WARNING: Bucket "${bucketName}" not found in the list!`);
            console.log('Available buckets:', data.Buckets?.map(b => b.Name));
        } else {
            console.log(`\nBucket "${bucketName}" exists.`);
        }

        console.log('\n2. Testing PutObject (Write Permission)...');
        const key = `debug-upload-${Date.now()}.txt`;
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: 'Debug test content',
        }));
        console.log('SUCCESS: PutObject worked! File uploaded:', key);

    } catch (err) {
        console.error('\nERROR OCCURRED:');
        console.error(err.name);
        console.error(err.message);
        if (err.name === 'AccessDenied') {
            console.error('\nCONCLUSION: The credentials provided DO NOT have write permissions (or ListBuckets permissions).');
        }
    }
}

run();
