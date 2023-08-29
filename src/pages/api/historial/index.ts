import {
  createHistorial,
  updateHistorialByGroup
} from 'lib/controllers/historialController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return createHistorial(req, res);
    case 'PUT':
      return updateHistorialByGroup(req, res);
    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
}
