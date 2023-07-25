import { Request, Response, NextFunction } from 'express';
import { Message } from '../../models/message';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
