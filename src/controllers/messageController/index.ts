import { getAllMessages } from './getAllMessages';
import { createMessage } from './createMessage';
import { getUserMessages } from './getUserMessages';
import { uploadFile } from './uploadFile';
import { deleteMessage } from './deleteMessage';
import { updateMessage } from './updateMessage';
import { getChannelMessages } from './getChannelMessages';
import { generateS3SignInUrl } from './generateS3SignInUrl';

const messageController = {
  getAllMessages,
  getUserMessages,
  createMessage,
  uploadFile,
  deleteMessage,
  updateMessage,
  getChannelMessages,
  generateS3SignInUrl,
};

export default messageController;
