import { Request, Response, NextFunction } from 'express';
import { UpdateMessageOperationTypes, updateMessageOperation } from '../operations';
import { formatResponse } from '../../../utils';
import { prismaClient } from '../../../lib';

interface UpdateMessageRequest<T> extends Request {
  body: T;
}

export const updateMessage = async (
  req: UpdateMessageRequest<UpdateMessageOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const { id, content, attachment } = req.body;

  const messagePayload = {
    id,
    content,
    attachment,
  };

  try {
    const updatedMessage = await updateMessageOperation(messagePayload, { prismaClient });

    res.json(formatResponse({ success: true, data: updatedMessage }));
  } catch (error) {
    next(error);
  }
};
