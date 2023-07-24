import express from 'express';
import { messageController } from '../controllers';
import { validateReqBodySchema } from '../middlewares/validateReqBodySchema';
import { logBody } from '../middlewares/messageMiddleware';
import { userIdParamScheme, messageSchema } from '../schemas';
const router = express.Router();

router.get('/', messageController.getAllMessages);
router.get(
  '/:userId',
  validateReqBodySchema(userIdParamScheme),
  messageController.getUserMessages
);
router.post(
  '/',
  logBody,
  validateReqBodySchema(messageSchema),
  messageController.createMessage
);

export default router;
