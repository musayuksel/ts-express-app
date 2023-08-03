import { getAllMessages } from './getAllMessages';
import { createMessage } from './createMessage';
import { getUserMessages } from './getUserMessages';
import { uploadFile } from './uploadFile';
import { deleteMessage } from './deleteMessage';
import { updateMessage } from './updateMessage';

const messageController = {
  getAllMessages,
  getUserMessages,
  createMessage,
  uploadFile,
  deleteMessage,
  updateMessage,
};

export default messageController;
