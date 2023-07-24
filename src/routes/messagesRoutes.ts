import express from 'express';
import { messageController } from '../controllers';
import { validateReqBodySchema } from '../middlewares/validateReqBodySchema';
import { validateReqParamSchema } from '../middlewares/validateReqParamSchema';
import { logBody } from '../middlewares/messageMiddleware';
import { userIdParamScheme, messageSchema } from '../schemas';
const router = express.Router();

router.get('/', messageController.getAllMessages);
router.get(
  '/:userId',
  validateReqParamSchema(userIdParamScheme),
  messageController.getUserMessages
);
router.post(
  '/',
  logBody,
  validateReqBodySchema(messageSchema),
  messageController.createMessage
);

export default router;
