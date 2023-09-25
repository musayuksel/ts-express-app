import { Context, MockContext, createMockContext, mockChannel } from '../../../../lib';
import { createChannelOperation } from './createChannelOperation';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('create operation', () => {
  it('should create the channel', async () => {
    mockContext.prismaClient.channels.create.mockResolvedValue(mockChannel);

    const createdChannel = await createChannelOperation({ channelName: 'testChannelName' }, context);

    expect(createdChannel.channelName).toBe('testChannelName');
  });

  it('should throw an error if channel already exists', async () => {
    mockContext.prismaClient.channels.findUnique.mockResolvedValue(mockChannel);

    await expect(() => createChannelOperation({ channelName: 'testChannelName' }, context)).rejects.toThrow(
      'Channel with name "testChannelName" already exists',
    );
  });
});
