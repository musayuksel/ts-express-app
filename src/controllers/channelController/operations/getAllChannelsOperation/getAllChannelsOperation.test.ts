import { Context, MockContext, createMockContext, mockChannel } from '../../../../lib';
import { getAllChannelsOperation } from './getAllChannelsOperation';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('getAllChannelsOperation', () => {
  it('should return all channels', async () => {
    mockContext.prismaClient.channels.findMany.mockResolvedValue([mockChannel]);

    const channels = await getAllChannelsOperation(context);

    expect(channels).toEqual([mockChannel]);
  });
});
