import { Request, Response, NextFunction } from 'express';
import { Message } from '../../models/message';
import { addSignedUrlToMessage } from './utils/addSignedUrlToMessage';

export const getAllMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Message.findAll();

    const messagesWithSignedUrlPromises = messages.map(async (currentMessage) => {
      const url = currentMessage.dataValues.attachment && (await addSignedUrlToMessage(currentMessage));
      return {
        ...currentMessage.dataValues,
        attachment: url,
      };
    });

    const messagesWithSignedUrl = await Promise.all(messagesWithSignedUrlPromises);
    res.json(messagesWithSignedUrl);
  } catch (error) {
    next(error);
  }
};
