import { mockChannel, mockUser, prismaMock } from '../../../../lib';
import { addUserToChannelOperation } from './addUserToChannelOperation';

describe('addUserToChannelOperation', () => {
  it('should add user to channel', async () => {
    prismaMock.channels.findUnique.mockResolvedValue(mockChannel);
    prismaMock.users.findUnique.mockResolvedValue(mockUser);
    prismaMock.channels.update.mockResolvedValue(mockChannel);

    const updatedChannel = await addUserToChannelOperation({
      userId: 'uuid_random_user_id',
      channelId: 'uuid_random_channel_id',
    });
    expect(updatedChannel.channelName).toBe('testChannelName');
  });

  it('should throw an error if channel does not exist', async () => {
    prismaMock.channels.findUnique.mockResolvedValue(null);
    prismaMock.users.findUnique.mockResolvedValue(mockUser);
    prismaMock.channels.update.mockResolvedValue(mockChannel);

    await expect(() =>
      addUserToChannelOperation({
        userId: 'uuid_random_user_id',
        channelId: 'uuid_random_channel_id',
      }),
    ).rejects.toThrow('Channel with id uuid_random_channel_id not found');
  });

  it('should throw an error if user does not exist', async () => {
    prismaMock.channels.findUnique.mockResolvedValue(mockChannel);
    prismaMock.users.findUnique.mockResolvedValue(null);
    prismaMock.channels.update.mockResolvedValue(mockChannel);

    await expect(() =>
      addUserToChannelOperation({
        userId: 'uuid_random_user_id',
        channelId: 'uuid_random_channel_id',
      }),
    ).rejects.toThrow('User with id uuid_random_user_id not found');
  });
});
