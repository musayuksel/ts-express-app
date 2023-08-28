import { mockChannel, prismaMock } from '../../../../lib/prisma';
import { createChannelOperation } from './createChannelOperation';

describe('create operation', () => {
  it('should create the channel', async () => {
    prismaMock.channels.create.mockResolvedValue(mockChannel);

    const createdChannel = await createChannelOperation({ channelName: 'testChannelName' });

    expect(createdChannel.channelName).toBe('testChannelName');
  });

  it('should throw an error if channel already exists', async () => {
    prismaMock.channels.findUnique.mockResolvedValue(mockChannel);

    await expect(() => createChannelOperation({ channelName: 'testChannelName' })).rejects.toThrow(
      'Channel with name "testChannelName" already exists',
    );
  });
});
