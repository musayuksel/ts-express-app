import { Request, Response, NextFunction } from 'express';
import { Message } from '../../models/message';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);
  }
};
