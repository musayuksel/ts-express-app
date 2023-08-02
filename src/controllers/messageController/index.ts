import { getAllMessages } from './getAllMessages';
import { createMessage } from './createMessage';
import { getUserMessages } from './getUserMessages';
import { uploadFile } from './uploadFile';

const messageController = {
  getAllMessages,
  getUserMessages,
  createMessage,
  uploadFile,
};

export default messageController;
