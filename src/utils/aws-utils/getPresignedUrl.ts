import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Instance } from '../aws-utils/awsClient'
import { TypeParams } from 'interfaces/s3-aws-methods'

export const downloadingS3File = async (bucketParams:TypeParams) => {

  try {
    const command = new GetObjectCommand(bucketParams);
    const data = await getSignedUrl(s3Instance, command);
    return data

  } catch (err) {
    return 'Error'
  }

};
