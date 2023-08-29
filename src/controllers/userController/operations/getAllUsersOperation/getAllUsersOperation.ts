import { prismaClient } from '../../../../lib';

export const getAllUsersOperation = async () => {
  return await prismaClient.users.findMany();
};
