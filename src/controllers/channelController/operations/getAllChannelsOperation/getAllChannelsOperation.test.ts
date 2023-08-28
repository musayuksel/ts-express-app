import { mockChannel, prismaMock } from '../../../../lib';
import { getAllChannelsOperation } from './getAllChannelsOperation';

describe('getAllChannelsOperation', () => {
  it('should return all channels', async () => {
    prismaMock.channels.findMany.mockResolvedValue([mockChannel]);

    const channels = await getAllChannelsOperation();

    expect(channels).toEqual([mockChannel]);
  });
});
