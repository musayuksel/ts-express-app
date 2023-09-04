import { Request, Response, NextFunction } from 'express';
import { getAllChannelsOperation } from '../operations';
import { formatResponse } from '../../../utils';

export const getAllChannels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const channels = await getAllChannelsOperation();

    res.json(formatResponse({ success: true, data: channels }));
  } catch (error) {
    next(error);
  }
};
