import { Request, Response, NextFunction } from 'express';
import { UpdateMessageOperationTypes, updateMessageOperation } from './operations';

interface UpdateMessageRequest<T> extends Request {
  body: T;
}

export const updateMessage = async (
  req: UpdateMessageRequest<UpdateMessageOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const { id, content, attachment } = req.body;

  try {
    const messagePayload = {
      id,
      content,
      attachment,
    };

    const updatedMessage = await updateMessageOperation(messagePayload);

    res.json({ 'updatedMessage:': updatedMessage });
  } catch (error) {
    next(error);
  }
};
