import { prismaClient } from '../../../../lib/prisma';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { AddUserToChannelOperationTypes } from './addUserToChannelOperation.types';

export const addUserToChannelOperation = async ({ userId, channelId }: AddUserToChannelOperationTypes) => {
  const channel = await prismaClient.channels.findUnique({
    where: {
      id: channelId,
    },
  });

  if (!channel) {
    throw new CustomError(`Channel with id ${channelId} not found`, 404);
  }

  const user = await prismaClient.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new CustomError(`User with id ${userId} not found`, 404);
  }

  return await prismaClient.channels.update({
    where: {
      id: channelId,
    },
    data: {
      users: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
