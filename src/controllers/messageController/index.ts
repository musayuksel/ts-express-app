import { getAllMessages } from './getAllMessages';
import { createMessage } from './createMessage';
import { getUserMessages } from './getUserMessages';
import { uploadFile } from './uploadFile';
import { deleteMessage } from './deleteMessage';

const messageController = {
  getAllMessages,
  getUserMessages,
  createMessage,
  uploadFile,
  deleteMessage,
};

export default messageController;
