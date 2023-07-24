import { Request, Response } from 'express';
import { Message } from '../../models/message';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const createMessage = async (req: Request, res: Response) => {
  const { content, UserId, ChannelId, attachment } = req.body;
  try {
    const newMessage = await Message.create({
      content,
      UserId,
      ChannelId,
      attachment: attachment || null,
    });
    res.json(newMessage);
  } catch (error) {
    throw new CustomError(`unable to create message ${content}`, 500);
  }
};
