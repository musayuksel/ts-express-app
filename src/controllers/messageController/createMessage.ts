import { Request, Response, NextFunction } from 'express';
import { CreateMessageOperationTypes, createMessageOperation } from './operations';
interface CreateMessageRequest<T> extends Request {
  body: T;
}

export const createMessage = async (
  req: CreateMessageRequest<CreateMessageOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { content, userId, channelId, attachment } = req.body;
    const messagePayload = {
      content,
      userId,
      channelId,
      attachment,
    };

    const newMessage = await createMessageOperation(messagePayload);

    res.json(newMessage);
  } catch (error) {
    next(error);
  }
};
