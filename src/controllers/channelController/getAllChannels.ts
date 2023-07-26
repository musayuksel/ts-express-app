import { Request, Response, NextFunction } from 'express';
import { Channel } from '../../models/channel';

export const getAllChannels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const channels = await Channel.findAll();

    res.json(channels);
  } catch (error) {
    next(error);
  }
};
