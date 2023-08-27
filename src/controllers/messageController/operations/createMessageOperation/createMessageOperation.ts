import { prismaClient } from '../../../../lib';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { CreateMessageOperationTypes } from './createMessageOperation.types';

export const createMessageOperation = async (messagePayload: CreateMessageOperationTypes) => {
  const { userId, channelId } = messagePayload;

  const currentChannel = await prismaClient.channels.findUnique({
    where: {
      id: channelId,
    },
    include: {
      users: true,
    },
  });

  if (!currentChannel) {
    throw new CustomError(`Channel does not exist!`, 404);
  }

  const isUserInChannel = currentChannel.users.find((user) => user.id === userId);

  if (!isUserInChannel) {
    throw new CustomError(`User is not in the channel! Please join the channel first!`, 404);
  }

  return await prismaClient.messages.create({
    data: messagePayload,
  });
};
