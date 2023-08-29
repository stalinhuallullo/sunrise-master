import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Instance } from "../aws-utils/awsClient";
import { Bucket } from 'interfaces/s3-aws-methods'

export const uploadingObject = async (params: Bucket) => {
  try {
      const data = await s3Instance.send(new PutObjectCommand(params));
      return data;
  } catch (err) {
      throw new Error
  }
};
