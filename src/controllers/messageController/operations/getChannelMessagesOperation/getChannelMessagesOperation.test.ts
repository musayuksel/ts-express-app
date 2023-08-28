import { mockMessage, prismaMock } from '../../../../lib';
import { getChannelMessagesOperation } from './getChannelMessagesOperation';

jest.mock('../../utils', () => ({
  addSignedUrlToMessage: jest.fn().mockImplementation((message) => message),
}));

describe('getChannelMessagesOperation', () => {
  it('should return all messages for a channel', async () => {
    const mockMessages = [{ ...mockMessage }, { ...mockMessage }];

    prismaMock.messages.findMany.mockResolvedValue(mockMessages);

    const messages = await getChannelMessagesOperation({ channelId: 'testChannelId' });

    expect(messages).toHaveLength(2);
  });
});
