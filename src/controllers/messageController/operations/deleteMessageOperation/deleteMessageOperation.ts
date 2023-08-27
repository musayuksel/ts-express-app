import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { prismaClient } from '../../../../lib/prisma';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { DeleteMessageOperationTypes } from './deleteMessageOperation.types';
import { s3 } from '../../utils/configureAWS';

export const deleteMessageOperation = async (messageIdPayload: DeleteMessageOperationTypes) => {
  const message = await prismaClient.messages.findUnique({
    where: {
      id: messageIdPayload.messageId,
    },
  });

  if (!message) {
    throw new CustomError(`Message with id ${messageIdPayload.messageId} not found`, 404);
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

  return await prismaClient.messages.delete({
    where: {
      id: messageIdPayload.messageId,
    },
  });
};
