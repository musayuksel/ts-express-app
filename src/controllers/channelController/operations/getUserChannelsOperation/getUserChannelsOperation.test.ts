import { Context, MockContext, createMockContext, mockChannel, mockUser } from '../../../../lib';
import { getUserChannelsOperation } from './getUserChannelsOperation';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('getUserChannelsOperation', () => {
  it('should return all channels for user', async () => {
    const mockUserWithChannels = { ...mockUser, channels: [{ ...mockChannel }, { ...mockChannel }] };

    mockContext.prismaClient.users.findUnique.mockResolvedValue(mockUserWithChannels);

    const userChannels = await getUserChannelsOperation({ userName: 'testUserName' }, context);

    expect(userChannels).toHaveLength(2);
  });

  it('should throw an error if user does not exist', async () => {
    await expect(() => getUserChannelsOperation({ userName: undefined }, context)).rejects.toThrow(
      "User doesn't exist!",
    );
  });

  it('should throw an error if user has no channels', async () => {
    const mockUserWithoutChannels = { ...mockUser, channels: null };

    mockContext.prismaClient.users.findUnique.mockResolvedValue(mockUserWithoutChannels);

    await expect(() => getUserChannelsOperation({ userName: 'testUserName' }, context)).rejects.toThrow(
      'User has no channels',
    );
  });
});
