import { Request, Response, NextFunction } from 'express';
import { Message } from '../../models/message';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const getUserMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const messages = await Message.findAll({
      where: {
        UserId: userId,
      },
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
