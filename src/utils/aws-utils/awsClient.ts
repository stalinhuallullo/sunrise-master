import { S3Client } from "@aws-sdk/client-s3"; 

const region = 'eu-west-1' as string
const accessKeyId = process.env.AWS_ACCESSKEY as string
const secretAccessKey = process.env.AWS_SECRETKEY as string

const s3Instance = new S3Client({ region,
    credentials: {accessKeyId, secretAccessKey: secretAccessKey}}
)

export {s3Instance, region}