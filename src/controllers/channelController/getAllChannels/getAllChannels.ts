import { Request, Response, NextFunction } from 'express';
import { getAllChannelsOperation } from '../operations';
import { formatResponse } from '../../../utils';
import { prismaClient } from '../../../lib';

export const getAllChannels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const channels = await getAllChannelsOperation({ prismaClient });

    res.json(formatResponse({ success: true, data: channels }));
  } catch (error) {
    next(error);
  }
};
