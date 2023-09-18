import { Request, Response, NextFunction } from 'express';
import { getUserChannelsOperation } from '../operations';
import { formatResponse } from '../../../utils';
import { prismaClient } from '../../../lib';

export const getUserChannels = async (req: Request, res: Response, next: NextFunction) => {
  const userPayload = {
    userName: req.currentUser?.username,
  };

  try {
    const userChannels = await getUserChannelsOperation(userPayload, { prismaClient });

    res.json(formatResponse({ success: true, data: userChannels }));
  } catch (error) {
    next(error);
  }
};
