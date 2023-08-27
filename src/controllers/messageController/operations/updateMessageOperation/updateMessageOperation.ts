import { prismaClient } from '../../../../lib';
import { UpdateMessageOperationTypes } from './updateMessageOperation.types';

export const updateMessageOperation = async (messagePayload: UpdateMessageOperationTypes) => {
  const { id, content, attachment } = messagePayload;

  const message = await prismaClient.messages.update({
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
