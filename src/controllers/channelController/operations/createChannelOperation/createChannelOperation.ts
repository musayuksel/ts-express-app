import { prismaClient } from '../../../../lib/prisma/prisma';
import { CreateChannelOperationTypes } from './createChannelOperation.types';

export const createChannelOperation = async (channel: CreateChannelOperationTypes) => {
  return await prismaClient.channels.create({
    data: channel,
  });
};
