import { Request, Response, NextFunction } from 'express';
import { Message } from '../../models/message';
import { CustomError } from '../../middlewares/globalErrorHandler';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from './utils/configureAWS';

export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { messageId } = req.params;
  try {
    const message = await Message.findByPk(messageId);
    if (message === null) {
      throw new CustomError(`Message with id ${messageId} not found`, 404);
    }
    const messageKey = message.attachment;
    if (messageKey) {
      // if there is an attachment delete it from s3
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: messageKey,
      };
      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    }

    Message.destroy({
      where: {
        id: messageId,
      },
    });

    res.json({ 'deletedMessage:': message });
  } catch (error) {
    next(error);
  }
};
