import { Context } from '../../../../lib';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { CreateChannelOperationTypes } from './createChannelOperation.types';

export const createChannelOperation = async (channel: CreateChannelOperationTypes, context: Context) => {
  const currentChannel = await context.prismaClient.channels.findUnique({
    where: {
      channelName: channel.channelName,
    },
  });

  if (currentChannel) {
    throw new CustomError(`Channel with name "${channel.channelName}" already exists`, 400);
  }

  return await context.prismaClient.channels.create({
    data: channel,
  });
};
