import { mockChannel, mockMessage, mockUser, prismaMock } from '../../../../lib';
import { createMessageOperation } from './createMessageOperation';

describe('createMessageOperation', () => {
  const mockMessagePayload = {
    content: 'testContent',
    userId: 'uuid_random_user_id',
    channelId: 'uuid_random_channel_id',
    attachment: 'testAttachment',
  };

  it('should create a message', async () => {
    const mockChannelWithUsers = { ...mockChannel, users: [{ ...mockUser }] };

    prismaMock.messages.create.mockResolvedValue(mockMessage);
    prismaMock.channels.findUnique.mockResolvedValue(mockChannelWithUsers);

    const createdMessage = await createMessageOperation(mockMessagePayload);

    expect(createdMessage).toBe(mockMessage);
  });

  it('should throw an error if channel does not exist', async () => {
    prismaMock.channels.findUnique.mockResolvedValue(null);

    await expect(() => createMessageOperation(mockMessagePayload)).rejects.toThrow('Channel does not exist!');
  });

  it('should throw an error if user is not in the channel', async () => {
    const mockChannelWithoutUsers = { ...mockChannel, users: [] };

    prismaMock.channels.findUnique.mockResolvedValue(mockChannelWithoutUsers);

    await expect(() => createMessageOperation(mockMessagePayload)).rejects.toThrow(
      'User is not in the channel! Please join the channel first!',
    );
  });
});

// export const createMessageOperation = async (messagePayload: CreateMessageOperationTypes) => {
//     const { userId, channelId } = messagePayload;

//     const currentChannel = await prismaClient.channels.findUnique({
//       where: {
//         id: channelId,
//       },
//       include: {
//         users: true,
//       },
//     });

//     if (!currentChannel) {
//       throw new CustomError(`Channel does not exist!`, 404);
//     }

//     const isUserInChannel = currentChannel.users.find((user) => user.id === userId);

//     if (!isUserInChannel) {
//       throw new CustomError(`User is not in the channel! Please join the channel first!`, 404);
//     }

//     return await prismaClient.messages.create({
//       data: messagePayload,
//     });
//   };
