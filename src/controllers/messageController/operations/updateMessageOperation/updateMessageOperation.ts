import { Context } from '../../../../lib';
import { UpdateMessageOperationTypes } from './updateMessageOperation.types';

export const updateMessageOperation = async (messagePayload: UpdateMessageOperationTypes, context: Context) => {
  const { id, content, attachment } = messagePayload;

  const message = await context.prismaClient.messages.update({
    where: {
      id: id,
    },
    data: {
      content,
      attachment,
    },
  });

  return message;
};
