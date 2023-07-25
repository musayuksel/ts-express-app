import { Request, Response, NextFunction } from 'express';
import { Channel } from '../../models/channel';

export const createChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { channelName } = req.body;

  try {
    const channel = await Channel.create({
      channelName,
    });

    res.json(channel);
  } catch (error) {
    next(error);
  }
};
