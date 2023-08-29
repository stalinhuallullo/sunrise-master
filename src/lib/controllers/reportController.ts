import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma';

export const createReport = async (
  req: NextApiRequest,
  res: NextApiResponse,
  historialId: number
) => {
  try {
    const { name, email, description } = req.body;

    const reports = await prisma.report.create({
      data: {
        name,
        email,
        description,
        historial: {
          connect: {
            id: historialId
          }
        }
      }
    });

    return res.status(200).json({
      status: '200',
      data: reports
    });
  } catch (error) {
    return res.json({
      status: '400',
      data: error || 'Something went wrong'
    });
  }
};

export const getReport = async (
  req: NextApiRequest,
  res: NextApiResponse,
  historialId: number
) => {
  try {
    const reports = await prisma.report.findMany({
      where: { historialId },
      select: {
        name: true,
        email: true,
        description: true
      }
    });

    return res.status(200).json({
      status: '200',
      data: reports
    });
  } catch (error) {
    return res.json({
      status: '400',
      data: error || 'Something went wrong'
    });
  }
};
