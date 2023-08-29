import { mockMessage, prismaMock } from '../../../../lib';
import { updateMessageOperation } from './updateMessageOperation';

describe('updateMessageOperation', () => {
  it('should update a message', async () => {
    const mockMessagePayload = {
      id: 'uuid_random_message_id',
      content: 'updated testContent',
      attachment: 'testAttachment',
    };

    prismaMock.messages.update.mockResolvedValue({ ...mockMessage, content: 'updated testContent' });

    const updatedMessage = await updateMessageOperation(mockMessagePayload);

    expect(updatedMessage.content).toBe(mockMessagePayload.content);
  });
});
