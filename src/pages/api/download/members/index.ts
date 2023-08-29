import type { NextApiRequest, NextApiResponse } from 'next';
import { downloadingS3File } from 'utils/aws-utils/getPresignedUrl';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { name } = req.body;
        const options = {
          Bucket: process.env.BUCKET_NAME as string,
          Key: name
        };

        const data = await downloadingS3File(options);
        return res.json({ url: data });
      } catch (error) {
        return res.json({
          status: 'error',
          data: error || 'Something went wrong'
        });
      }
    default:
      res.setHeader('Allow', ['POST']);
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
}
