import { Request, Response, NextFunction } from 'express';
import { Channel } from '../../models/channel';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const addUserToChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, channelId } = req.body;

  try {
    const channel = await Channel.findByPk(channelId);
    if (!channel) {
      throw new CustomError(`Channel with id ${channelId} not found`, 404);
    }
    await channel.addUser(userId);
    res.json(channel);
  } catch (error) {
    next(error);
  }
};
