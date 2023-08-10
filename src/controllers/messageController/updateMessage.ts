import { Request, Response, NextFunction } from 'express';
import { Message } from '../../models/message';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const updateMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { id, content, attachment } = req.body;
  try {
    const message = await Message.findByPk(id);
    if (message === null) {
      throw new CustomError(`Message with id ${id} not found`, 404);
    }

    await Message.update(
      {
        content,
        attachment,
      },
      {
        where: {
          id: id,
        },
      },
    );

    const updatedMessage = await Message.findByPk(id);
    res.json({ 'updatedMessage:': updatedMessage });
  } catch (error) {
    next(error);
  }
};
