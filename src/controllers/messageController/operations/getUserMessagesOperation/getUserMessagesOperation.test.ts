import { Context, MockContext, createMockContext, mockMessage, mockUser, prismaMock } from '../../../../lib';
import { getUserMessagesOperation } from './getUserMessagesOperation';

jest.mock('../../utils', () => ({
  addSignedUrlToMessage: jest.fn().mockImplementation((message) => message),
}));

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('getUserMessagesOperation', () => {
  it('should return all messages for a user', async () => {
    const mockUserWithMessages = { ...mockUser, messages: [{ ...mockMessage }] };
    mockContext.prismaClient.users.findUnique.mockResolvedValue(mockUserWithMessages);

    const messages = await getUserMessagesOperation({ userId: 'testUserId' }, context);

    expect(messages).toHaveLength(1);
    expect(messages[0].content).toBe(mockMessage.content);
  });

  it('should throw an error if user does not exist', async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);

    await expect(() => getUserMessagesOperation({ userId: 'testUserId' }, context)).rejects.toThrow('User not found');
  });
});
