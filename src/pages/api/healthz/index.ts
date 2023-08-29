import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { status: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ status: 'ok' });
}
