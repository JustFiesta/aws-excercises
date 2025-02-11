const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
    console.log('1. Lambda started with event:', JSON.stringify(event));

    try {
        // 1. Secrets Manager Test
        console.log('2. Testing Secrets Manager...');
        let secretData;
        try {
            secretData = await secretsManager.getSecretValue({
                SecretId: process.env.SECRET_ARN
            }).promise();
            console.log('3. Secret retrieved ✓');
        } catch (secretError) {
            console.log('Secret Manager Error:', {
                message: secretError.message,
                code: secretError.code
            });
            throw new Error(`Secrets Manager failed: ${secretError.message}`);
        }

        // 2. S3 Test
        console.log('4. Testing S3...');
        let bucketContents;
        try {
            bucketContents = await s3.listObjectsV2({
                Bucket: process.env.BUCKET_NAME,
                MaxKeys: 10
            }).promise();
            console.log('5. S3 listed ✓');
        } catch (s3Error) {
            console.log('S3 Error:', {
                message: s3Error.message,
                code: s3Error.code
            });
            throw new Error(`S3 failed: ${s3Error.message}`);
        }

        // Prepare response
        console.log('6. Preparing response...');
        const response = {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                secretTest: "success",
                s3Test: "success",
                files: bucketContents.Contents 
                    ? bucketContents.Contents.map(item => item.Key)
                    : []
            })
        };
        console.log('7. Response ready:', JSON.stringify(response));
        return response;

    } catch (error) {
        console.log('ERROR:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                error: error.message,
                type: error.name
            })
        };
    }
};