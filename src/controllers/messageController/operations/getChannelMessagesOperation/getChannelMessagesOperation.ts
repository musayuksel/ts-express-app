import { Context } from '../../../../lib';
import { addSignedUrlToMessage } from '../../utils';

import { GetChannelMessagesOperationTypes } from './getChannelMessagesOperation.types';

export const getChannelMessagesOperation = async (
  channelIdPayload: GetChannelMessagesOperationTypes,
  context: Context,
) => {
  const messages = await context.prismaClient.messages.findMany({
    where: {
      channelId: channelIdPayload.channelId,
    },
  });

  const messagesWithSignedUrlPromises = messages.map(async (currentMessage) => {
    if (currentMessage.attachment) {
      currentMessage.attachment = await addSignedUrlToMessage(currentMessage);
    }
    return currentMessage;
  });

  return await Promise.all(messagesWithSignedUrlPromises);
};
