import { prismaClient } from '../../../../lib/prisma';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { CreateNewUserOperationTypes } from './createNewUserOperation.types';

export const createNewUserOperation = async (user: CreateNewUserOperationTypes) => {
  const currentUser = await prismaClient.users.findUnique({
    where: {
      userName: user.userName,
    },
  });

  if (currentUser) {
    throw new CustomError(`User with name "${user.userName}" already exists`);
  }

  return await prismaClient.users.create({
    data: user,
  });
};
