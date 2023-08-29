import { prismaClient } from '../../../../lib';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { UpdateUserOperationTypes } from './updateUserOperation.types';

export const updateUserOperation = async (userPayload: UpdateUserOperationTypes) => {
  const { id, userName, firstName, lastName } = userPayload;

  const user = await prismaClient.users.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new CustomError(`User not found`, 404);
  }

  return await prismaClient.users.update({
    where: {
      id: id,
    },
    data: {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
    },
  });
};
