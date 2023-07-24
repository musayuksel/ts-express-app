import { Router } from 'express';
import { channelController } from '../controllers';

const router = Router();

router.get('/', channelController.getAllChannels);
router.post('/', channelController.createChannel);
router.post('/addUser', channelController.addUserToChannel);

export default router;
