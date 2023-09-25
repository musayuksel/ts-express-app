import { Context, MockContext, createMockContext, mockMessage } from '../../../../lib';
import { deleteMessageOperation } from './deleteMessageOperation';

jest.mock('../../utils/configureAWS', () => ({
  s3: {
    send: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}));

jest.mock('@aws-sdk/client-s3', () => ({
  DeleteObjectCommand: jest.fn().mockImplementation(() => Promise.resolve()),
}));

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('deleteMessageOperation', () => {
  it('should delete a message', async () => {
    mockContext.prismaClient.messages.findUnique.mockResolvedValue(mockMessage);
    mockContext.prismaClient.messages.delete.mockResolvedValue(mockMessage);

    const deletedMessage = await deleteMessageOperation({ messageId: 'testMessageId' }, context);

    expect(deletedMessage).toBe(mockMessage);
  });

  it('should throw an error if message does not exist', async () => {
    mockContext.prismaClient.messages.findUnique.mockResolvedValue(null);

    await expect(() => deleteMessageOperation({ messageId: 'testMessageId' }, context)).rejects.toThrow(
      'Message with id testMessageId not found',
    );
  });
});
