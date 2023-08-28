import { mockMessage, mockUser, prismaMock } from '../../../../lib';
import { getUserMessagesOperation } from './getUserMessagesOperation';

jest.mock('../../utils', () => ({
  addSignedUrlToMessage: jest.fn().mockImplementation((message) => message),
}));

describe('getUserMessagesOperation', () => {
  it('should return all messages for a user', async () => {
    const mockUserWithMessages = { ...mockUser, messages: [{ ...mockMessage }] };
    prismaMock.users.findUnique.mockResolvedValue(mockUserWithMessages);

    const messages = await getUserMessagesOperation({ userId: 'testUserId' });

    expect(messages).toHaveLength(1);
    expect(messages[0].content).toBe(mockMessage.content);
  });

  it('should throw an error if user does not exist', async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);

    await expect(() => getUserMessagesOperation({ userId: 'testUserId' })).rejects.toThrow('User not found');
  });
});
