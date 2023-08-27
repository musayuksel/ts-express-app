import { prismaClient } from '../../../../lib/prisma';

export const getAllChannelsOperation = async () => {
  return await prismaClient.channels.findMany();
};
