import { Context } from '../../../../lib';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { UpdateUserOperationTypes } from './updateUserOperation.types';

export const updateUserOperation = async (userPayload: UpdateUserOperationTypes, context: Context) => {
  const { id, userName, firstName, lastName } = userPayload;

  const user = await context.prismaClient.users.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new CustomError(`User not found`, 404);
  }

  return await context.prismaClient.users.update({
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
