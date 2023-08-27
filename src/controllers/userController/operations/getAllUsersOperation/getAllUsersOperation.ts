import { prismaClient } from '../../../../lib/prisma';

export const getAllUsersOperation = async () => {
  return await prismaClient.users.findMany();
};
