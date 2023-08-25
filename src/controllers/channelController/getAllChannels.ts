import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../../lib/prisma/prisma';

export const getAllChannels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const channels = await prismaClient.channels.findMany();
    res.json(channels);
  } catch (error) {
    next(error);
  }
};
