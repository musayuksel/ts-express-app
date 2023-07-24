import { Request, Response } from 'express';
import { Channel } from '../../models/channel';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const createChannel = async (req: Request, res: Response) => {
  const { channelName } = req.body;

  try {
    const channel = await Channel.create({
      channelName,
    });
  
    res.json(channel);
  } catch (error) {
    throw new CustomError(`unable to create channel ${channelName}`, 500);
  }
};
