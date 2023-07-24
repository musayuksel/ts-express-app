import { Router } from 'express';
import { channelController } from '../controllers';
import { validateSchema } from '../middlewares/validateSchema';
import { channelSchema } from '../schemas';

const router = Router();

router.get('/', channelController.getAllChannels);
router.post('/', validateSchema(channelSchema), channelController.createChannel);
router.post('/addUser', channelController.addUserToChannel);

export default router;
