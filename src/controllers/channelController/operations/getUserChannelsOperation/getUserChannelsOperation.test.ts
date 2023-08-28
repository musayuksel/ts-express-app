import { mockChannel, mockUser, prismaMock } from '../../../../lib';
import { getUserChannelsOperation } from './getUserChannelsOperation';

describe('getUserChannelsOperation', () => {
  it('should return all channels for user', async () => {
    const mockUserWithChannels = { ...mockUser, channels: [{ ...mockChannel }, { ...mockChannel }] };

    prismaMock.users.findUnique.mockResolvedValue(mockUserWithChannels);

    const userChannels = await getUserChannelsOperation({ userName: 'testUserName' });

    expect(userChannels).toHaveLength(2);
  });

  it('should throw an error if user does not exist', async () => {
    await expect(() => getUserChannelsOperation({ userName: undefined })).rejects.toThrow("User doesn't exist!");
  });

  it('should throw an error if user has no channels', async () => {
    const mockUserWithoutChannels = { ...mockUser, channels: null };

    prismaMock.users.findUnique.mockResolvedValue(mockUserWithoutChannels);

    await expect(() => getUserChannelsOperation({ userName: 'testUserName' })).rejects.toThrow('User has no channels');
  });
});
