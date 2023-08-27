import { Router } from 'express';
import { channelController } from '../controllers';
import { validateReqBodySchema } from '../middlewares/validateReqBodySchema';
import { channelSchema } from '../schemas';
import { addUserToChannelSchema } from '../schemas/channel.schema';

const router = Router();

router.get('/', channelController.getAllChannels);
router.get('/userChannels', channelController.getUserChannels);
router.post('/', validateReqBodySchema(channelSchema), channelController.createChannel);
router.post('/addUser', validateReqBodySchema(addUserToChannelSchema), channelController.addUserToChannel);

export default router;
