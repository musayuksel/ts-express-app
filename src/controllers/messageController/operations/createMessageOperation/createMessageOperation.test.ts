import { Context, MockContext, createMockContext, mockChannel, mockMessage, mockUser } from '../../../../lib';
import { createMessageOperation } from './createMessageOperation';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('createMessageOperation', () => {
  const mockMessagePayload = {
    content: 'testContent',
    userId: 'uuid_random_user_id',
    channelId: 'uuid_random_channel_id',
    attachment: 'testAttachment',
  };

  it('should create a message', async () => {
    const mockChannelWithUsers = { ...mockChannel, users: [{ ...mockUser }] };

    mockContext.prismaClient.messages.create.mockResolvedValue(mockMessage);
    mockContext.prismaClient.channels.findUnique.mockResolvedValue(mockChannelWithUsers);

    const createdMessage = await createMessageOperation(mockMessagePayload, context);

    expect(createdMessage).toBe(mockMessage);
  });

  it('should throw an error if channel does not exist', async () => {
    mockContext.prismaClient.channels.findUnique.mockResolvedValue(null);

    await expect(() => createMessageOperation(mockMessagePayload, context)).rejects.toThrow('Channel does not exist!');
  });

  it('should throw an error if user is not in the channel', async () => {
    const mockChannelWithoutUsers = { ...mockChannel, users: [] };

    mockContext.prismaClient.channels.findUnique.mockResolvedValue(mockChannelWithoutUsers);

    await expect(() => createMessageOperation(mockMessagePayload, context)).rejects.toThrow(
      'User is not in the channel! Please join the channel first!',
    );
  });
});
