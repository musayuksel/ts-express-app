import { Context } from '../../../../lib';

export const getAllUsersOperation = async (context: Context) => {
  return await context.prismaClient.users.findMany();
};
