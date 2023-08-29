import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { DeleteMessageOperationTypes, deleteMessageOperation } from './operations';
import { formatResponse } from '../../utils';

interface DeleteMessageRequest<T extends ParamsDictionary> extends Request {
  params: T;
}

export const deleteMessage = async (
  req: DeleteMessageRequest<DeleteMessageOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const messageIdPayload = {
    messageId: req.params.messageId,
  };

  try {
    const deletedMessage = await deleteMessageOperation(messageIdPayload);

    res.json({ deletedMessage });
    res.json(formatResponse({ success: true, data: deletedMessage }));
  } catch (error) {
    next(error);
  }
};
