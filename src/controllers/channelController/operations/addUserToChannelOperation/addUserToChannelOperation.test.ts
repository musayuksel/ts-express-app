import { Context, MockContext, createMockContext, mockChannel, mockUser } from '../../../../lib';
import { addUserToChannelOperation } from './addUserToChannelOperation';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('addUserToChannelOperation', () => {
  it('should add user to channel', async () => {
    mockContext.prismaClient.channels.findUnique.mockResolvedValue(mockChannel);
    mockContext.prismaClient.users.findUnique.mockResolvedValue(mockUser);
    mockContext.prismaClient.channels.update.mockResolvedValue(mockChannel);

    const updatedChannel = await addUserToChannelOperation(
      {
        userId: 'uuid_random_user_id',
        channelId: 'uuid_random_channel_id',
      },
      context,
    );

    expect(updatedChannel.channelName).toBe('testChannelName');
  });

  it('should throw an error if channel does not exist', async () => {
    mockContext.prismaClient.channels.findUnique.mockResolvedValue(null);
    mockContext.prismaClient.users.findUnique.mockResolvedValue(mockUser);
    mockContext.prismaClient.channels.update.mockResolvedValue(mockChannel);

    await expect(() =>
      addUserToChannelOperation(
        {
          userId: 'uuid_random_user_id',
          channelId: 'uuid_random_channel_id',
        },
        context,
      ),
    ).rejects.toThrow('Channel with id uuid_random_channel_id not found');
  });

  it('should throw an error if user does not exist', async () => {
    mockContext.prismaClient.channels.findUnique.mockResolvedValue(mockChannel);
    mockContext.prismaClient.users.findUnique.mockResolvedValue(null);
    mockContext.prismaClient.channels.update.mockResolvedValue(mockChannel);

    await expect(() =>
      addUserToChannelOperation(
        {
          userId: 'uuid_random_user_id',
          channelId: 'uuid_random_channel_id',
        },
        context,
      ),
    ).rejects.toThrow('User with id uuid_random_user_id not found');
  });
});
