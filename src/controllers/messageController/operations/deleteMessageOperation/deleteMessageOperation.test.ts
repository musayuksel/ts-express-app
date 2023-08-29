import { mockMessage, prismaMock } from '../../../../lib';
import { deleteMessageOperation } from './deleteMessageOperation';

jest.mock('../../utils/configureAWS', () => ({
  s3: {
    send: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}));

jest.mock('@aws-sdk/client-s3', () => ({
  DeleteObjectCommand: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('deleteMessageOperation', () => {
  it('should delete a message', async () => {
    prismaMock.messages.findUnique.mockResolvedValue(mockMessage);
    prismaMock.messages.delete.mockResolvedValue(mockMessage);

    const deletedMessage = await deleteMessageOperation({ messageId: 'testMessageId' });

    expect(deletedMessage).toBe(mockMessage);
  });

  it('should throw an error if message does not exist', async () => {
    prismaMock.messages.findUnique.mockResolvedValue(null);

    await expect(() => deleteMessageOperation({ messageId: 'testMessageId' })).rejects.toThrow(
      'Message with id testMessageId not found',
    );
  });
});
