import { Request, Response, NextFunction } from 'express';
import { Message } from '../../models/message';

export const getChannelMessages = async (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.params;
  try {
    const messages = await Message.findAll({
      where: {
        ChannelId: channelId,
      },
    });

    res.json(messages);
  } catch (error) {
    next(error);
  }
};
