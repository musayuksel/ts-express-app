import { Context } from '../../../../lib';

export const getAllChannelsOperation = async (context: Context) => {
  return await context.prismaClient.channels.findMany();
};
