import { Context } from '../../../../lib';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { addSignedUrlToMessage } from '../../utils';
import { GetUserMessagesOperationTypes } from './getUserMessagesOperation.types';

export const getUserMessagesOperation = async (userIdPayload: GetUserMessagesOperationTypes, context: Context) => {
  const user = await context.prismaClient.users.findUnique({
    where: {
      id: userIdPayload.userId,
    },
    include: {
      messages: true,
    },
  });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const messagesWithSignedUrlPromises = user.messages.map(async (currentMessage) => {
    if (currentMessage.attachment) {
      currentMessage.attachment = await addSignedUrlToMessage(currentMessage);
    }
    return currentMessage;
  });

  return await Promise.all(messagesWithSignedUrlPromises);
};
