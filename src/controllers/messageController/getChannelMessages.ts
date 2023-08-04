import { Request, Response, NextFunction } from 'express';
import { Message } from '../../models/message';
import { addSignedUrlToMessage } from './utils/addSignedUrlToMessage';

export const getChannelMessages = async (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.params;
  try {
    const messages = await Message.findAll({
      where: {
        ChannelId: channelId,
      },
    });

    const messagesWithSignedUrlPromises = messages.map(async (currentMessage) => {
      if (currentMessage.attachment) {
        currentMessage.attachment = await addSignedUrlToMessage(currentMessage);
      }
      return currentMessage;
    });

    const messagesWithSignedUrl = await Promise.all(messagesWithSignedUrlPromises);
    res.json(messagesWithSignedUrl);
  } catch (error) {
    next(error);
  }
};
