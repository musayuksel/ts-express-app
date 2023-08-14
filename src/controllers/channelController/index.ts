import { getAllChannels } from './getAllChannels';
import { createChannel } from './createChannel';
import { addUserToChannel } from './addUserToChannel';
import { getUserChannels } from './getUserChannels';

const channelController = {
  getAllChannels,
  createChannel,
  addUserToChannel,
  getUserChannels,
};

export default channelController;
