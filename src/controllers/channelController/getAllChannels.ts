import { Request, Response, NextFunction } from 'express';
import { getAllChannelsOperation } from './operations';

export const getAllChannels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const channels = await getAllChannelsOperation();
    res.json(channels);
  } catch (error) {
    next(error);
  }
};
