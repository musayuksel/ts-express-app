import { prismaClient } from '../../../../lib';

export const getAllChannelsOperation = async () => {
  return await prismaClient.channels.findMany();
};
