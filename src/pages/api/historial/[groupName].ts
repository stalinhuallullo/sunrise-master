import { getHistorialByName } from 'lib/controllers/historialController';
import type { NextApiRequest, NextApiResponse } from 'next'; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { groupName } = req.query as { groupName: string };

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res
      .status(405)
      .json({ success: false, message: `Method ${method} Not Allowed` });
  }

  return getHistorialByName(req, res, groupName);
}
