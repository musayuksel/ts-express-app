import { Context } from '../../../../lib';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { CreateNewUserOperationTypes } from './createNewUserOperation.types';

export const createNewUserOperation = async (user: CreateNewUserOperationTypes, context: Context) => {
  const currentUser = await context.prismaClient.users.findUnique({
    where: {
      userName: user.userName,
    },
  });

  if (currentUser) {
    throw new CustomError(`User with name "${user.userName}" already exists`);
  }

  return await context.prismaClient.users.create({
    data: user,
  });
};
