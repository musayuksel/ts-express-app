import { Request, Response } from 'express';
import { Message } from '../../models/message';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const getUserMessages = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const messages = await Message.findAll({
      where: {
        UserId: userId,
      },
    });
    res.json(messages);
  } catch (error) {
    throw new CustomError('User not found', 404);
  }
};
