import express from 'express';
import { messageController } from '../controllers';
import { validateSchema } from '../middlewares/validateSchema';
import { logBody } from '../middlewares/messageMiddleware';
import { messageSchema } from '../schemas';
const router = express.Router();

router.get('/', messageController.getAllMessages);
router.get('/:userId', messageController.getUserMessages);
router.post(
  '/',
  logBody,
  validateSchema(messageSchema),
  messageController.createMessage
);

export default router;
