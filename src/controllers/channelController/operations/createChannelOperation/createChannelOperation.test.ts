import { prismaMock } from '../../../../lib/prisma';
import { createChannelOperation } from './createChannelOperation';

describe('create operation', () => {
  const mockDate = new Date('2023-01-01T00:00:00.000Z');

  const mockChannel = {
    id: 'uuid_random_string',
    channelName: 'testChannelName',
    createdAt: mockDate,
    updatedAt: mockDate,
  };

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
