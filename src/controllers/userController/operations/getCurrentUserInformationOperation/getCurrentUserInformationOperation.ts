import { Context } from '../../../../lib';
import { CustomError } from '../../../../middlewares/globalErrorHandler';

export const getCurrentUserInformationOperation = async (
  userNamePayload: {
    userName?: string;
  },
  context: Context,
) => {
  const { userName } = userNamePayload;

  if (!userName) {
    throw new CustomError("User doesn't exist!", 404);
  }

  const user = await context.prismaClient.users.findUnique({
    where: {
      userName: userName,
    },
  });

  if (!user) {
    throw new CustomError('User has no channels', 404);
  }
  return user;
};
