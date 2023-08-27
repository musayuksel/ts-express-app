import { prismaMock } from '../../../../lib/prisma';
import { createChannelOperation } from './createChannelOperation';

describe('create operation', () => {
  it('should create the channel', async () => {
    prismaMock.channels.create.mockResolvedValue({
      id: 'uuid_random_string',
      channelName: 'testChannelName',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdChannel = await createChannelOperation({ channelName: 'testChannelName' });

    expect(createdChannel?.channelName).toBe('testChannelName');
  });
});
