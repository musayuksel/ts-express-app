import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { DeleteMessageOperationTypes, deleteMessageOperation } from './operations';

interface DeleteMessageRequest<T extends ParamsDictionary> extends Request {
  params: T;
}

export const deleteMessage = async (
  req: DeleteMessageRequest<DeleteMessageOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const messageIdPayload = {
      messageId: req.params.messageId,
    };

    const deletedMessage = await deleteMessageOperation(messageIdPayload);

    res.json({ deletedMessage });
  } catch (error) {
    next(error);
  }
};
