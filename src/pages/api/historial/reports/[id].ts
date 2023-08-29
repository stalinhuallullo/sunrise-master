import { createReport, getReport } from 'lib/controllers/reportController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query as { id: string };
  const historialId = parseInt(id);

  if (isNaN(historialId)) {
    return res.status(400).json({
      status: '400',
      message: 'Provide valid historial id'
    });
  }

  switch (method) {
    case 'GET':
      return getReport(req, res, historialId);
    case 'POST':
      return createReport(req, res, historialId);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
}
