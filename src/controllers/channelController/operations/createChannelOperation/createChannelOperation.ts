import { prismaClient } from '../../../../lib';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { CreateChannelOperationTypes } from './createChannelOperation.types';

export const createChannelOperation = async (channel: CreateChannelOperationTypes) => {
  const currentChannel = await prismaClient.channels.findUnique({
    where: {
      channelName: channel.channelName,
    },
  });

  if (currentChannel) {
    throw new CustomError(`Channel with name "${channel.channelName}" already exists`, 400);
  }

  return await prismaClient.channels.create({
    data: channel,
  });
};
