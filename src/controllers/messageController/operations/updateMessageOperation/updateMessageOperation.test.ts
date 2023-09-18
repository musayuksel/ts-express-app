import { Context, MockContext, createMockContext, mockMessage } from '../../../../lib';
import { updateMessageOperation } from './updateMessageOperation';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('updateMessageOperation', () => {
  it('should update a message', async () => {
    const mockMessagePayload = {
      id: 'uuid_random_message_id',
      content: 'updated testContent',
      attachment: 'testAttachment',
    };

    mockContext.prismaClient.messages.update.mockResolvedValue({ ...mockMessage, content: 'updated testContent' });

    const updatedMessage = await updateMessageOperation(mockMessagePayload, context);

    expect(updatedMessage.content).toBe(mockMessagePayload.content);
  });
});
