import { getAllMessages } from './getAllMessages';
import { createMessage } from './createMessage';
import { getUserMessages } from './getUserMessages';
import { uploadFile } from './uploadFile';
import { deleteMessage } from './deleteMessage';
import { updateMessage } from './updateMessage';
import { getChannelMessages } from './getChannelMessages';

const messageController = {
  getAllMessages,
  getUserMessages,
  createMessage,
  uploadFile,
  deleteMessage,
  updateMessage,
  getChannelMessages,
};

export default messageController;
