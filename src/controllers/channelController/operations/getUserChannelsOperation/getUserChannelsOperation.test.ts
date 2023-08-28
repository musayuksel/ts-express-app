import { mockChannel, mockUser, prismaMock } from '../../../../lib';
import { getUserChannelsOperation } from './getUserChannelsOperation';

describe('getUserChannelsOperation', () => {
  it('should return all channels for user', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prismaMock.users.findUnique.mockResolvedValue({ mockUser, channels: [mockChannel, mockChannel] } as any);
    // TODO - fix return type

    const userChannels = await getUserChannelsOperation({ userName: 'testUserName' });

    expect(userChannels).toHaveLength(2);
  });

  it('should throw an error if user does not exist', async () => {
    await expect(() => getUserChannelsOperation({ userName: undefined })).rejects.toThrow("User doesn't exist!");
  });

  it('should throw an error if user has no channels', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prismaMock.users.findUnique.mockResolvedValue({ mockUser, channels: null } as any);
    // TODO - fix return type

    await expect(() => getUserChannelsOperation({ userName: 'testUserName' })).rejects.toThrow('User has no channels');
  });
});
