import { Context, MockContext, createMockContext, mockMessage } from '../../../../lib';
import { getChannelMessagesOperation } from './getChannelMessagesOperation';

jest.mock('../../utils', () => ({
  addSignedUrlToMessage: jest.fn().mockImplementation((message) => message),
}));

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('getChannelMessagesOperation', () => {
  it('should return all messages for a channel', async () => {
    const mockMessages = [{ ...mockMessage }, { ...mockMessage }];

    mockContext.prismaClient.messages.findMany.mockResolvedValue(mockMessages);

    const messages = await getChannelMessagesOperation({ channelId: 'testChannelId' }, context);

    expect(messages).toHaveLength(2);
  });
});
