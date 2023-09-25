import { Context } from '../../../../lib';
import { CustomError } from '../../../../middlewares/globalErrorHandler';
import { GetUserChannelsOperationTypes } from './getUserChannelsOperation.types';

export const getUserChannelsOperation = async (userNamePayload: GetUserChannelsOperationTypes, context: Context) => {
  const { userName } = userNamePayload;
  if (!userName) {
    throw new CustomError("User doesn't exist!", 404);
  }

  const user = await context.prismaClient.users.findUnique({
    where: {
      userName: userName,
    },
    include: {
      channels: true,
    },
  });

  if (!user || !user.channels) {
    throw new CustomError('User has no channels', 404);
  }
  return user?.channels;
};
