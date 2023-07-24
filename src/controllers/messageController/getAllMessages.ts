import { Request, Response } from 'express';
import { Message } from '../../models/message';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    throw new CustomError('Something went wrong', 500);
  }
};
