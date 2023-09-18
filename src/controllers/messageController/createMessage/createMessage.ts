import { Request, Response, NextFunction } from 'express';
import { CreateMessageOperationTypes, createMessageOperation } from '../operations';
import { formatResponse } from '../../../utils';
import { prismaClient } from '../../../lib';
interface CreateMessageRequest<T> extends Request {
  body: T;
}

export const createMessage = async (
  req: CreateMessageRequest<CreateMessageOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const { content, userId, channelId, attachment } = req.body;

  const messagePayload = {
    content,
    userId,
    channelId,
    attachment,
  };

  try {
    const newMessage = await createMessageOperation(messagePayload, { prismaClient });

    res.json(formatResponse({ success: true, data: newMessage }));
  } catch (error) {
    next(error);
  }
};
