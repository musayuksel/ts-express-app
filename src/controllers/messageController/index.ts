import { getAllMessages } from './getAllMessages';
import { createMessage } from './createMessage';
import { getUserMessages } from './getUserMessages';

const messageController = {
  getAllMessages,
  getUserMessages,
  createMessage,
};

export default messageController;
