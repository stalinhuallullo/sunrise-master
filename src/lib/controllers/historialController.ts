import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma';

export const createHistorial = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const savedHistorial = await prisma.historial.create({
      data: req.body
    });

    return res.status(200).json({
      status: '200',
      data: savedHistorial
    });
  } catch (error) {
    return res.json({
      status: '400',
      data: error || 'Something went wrong'
    });
  }
};

export const getHistorialByName = async (
  req: NextApiRequest,
  res: NextApiResponse,
  groupName: string
) => {
  try {
    const uploadedHistory = await prisma.historial.findMany({
      where: { groupName }
    });
    return res.status(200).json({
      status: '200',
      data: uploadedHistory
    });
  } catch (error) {
    return res.json({
      status: '400',
      data: error || 'Something went wrong'
    });
  }
};

export const updateHistorialByGroup = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const updateHistory = await prisma.historial.update({
      select: {
        id: true,
        filename: true
      },
      where: {
        id: req.body.id
      },
      data: {
        filename: req.body.newFilename as string,
        status: '200'
      }
    });

    return res.status(200).json({
      status: '200',
      data: updateHistory
    });
  } catch (error) {
    return res.json({
      status: '400',
      data: error || 'Something went wrong'
    });
  }
};
