import { prismaClient } from '../../../../lib/prisma';
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
  //  TODO: add PRISMA error handling
  return message;
};
