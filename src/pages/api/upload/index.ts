import type { NextApiRequest, NextApiResponse } from 'next';
import { InfoTableMembers } from 'interfaces/boxToDrag-interface';
import { uploadingObject } from 'utils/aws-utils/putObjectAws';
import { convertJSONtoCSV } from '@utils/data-utils/jsonToCsv';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    newData: InfoTableMembers[];
    filename: string;
  };
}

export const config = {
  api: {
    bodyParser: true
  }
};

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  try {
    const { newData, filename } = req.body;
    const { sheetDataBuffer } = convertJSONtoCSV(newData);

    if (sheetDataBuffer.byteLength <= 0 || newData.length <= 0) {
      throw new Error('Data buffer Error');
    }

    const params = {
      Bucket: process.env.BUCKET_NAME as string,
      Key: filename,
      Body: sheetDataBuffer
    };
    const data = await uploadingObject(params);
    if (data?.$metadata.httpStatusCode === 200) {
      res.status(200).json({
        data: 'Ok',
        status: '200',
        filename: filename
      });
    }
  } catch (error) {
    return res.json({
      status: 'error',
      data: error || 'Something went wrong'
    });
  }
}
