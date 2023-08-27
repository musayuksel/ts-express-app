import express from 'express';
import { messageController } from '../controllers';
import { validateReqBodySchema } from '../middlewares/validateReqBodySchema';
import { validateReqParamSchema } from '../middlewares/validateReqParamSchema';
import { logBody } from '../middlewares/messageMiddleware';
import { userIdParamSchema, messageSchema } from '../schemas';
import {
  channelIdParamSchema,
  fileNameSchema,
  messageIdParamSchema,
  updateMessageSchema,
} from '../schemas/message.schema';
const router = express.Router();

router.get('/:userId', validateReqParamSchema(userIdParamSchema), messageController.getUserMessages);
router.get('/channel/:channelId', validateReqParamSchema(channelIdParamSchema), messageController.getChannelMessages);
router.post('/', logBody, validateReqBodySchema(messageSchema), messageController.createMessage);
router.post('/generateS3SignInUrl', validateReqBodySchema(fileNameSchema), messageController.generateS3SignInUrl);
router.delete('/:messageId', validateReqParamSchema(messageIdParamSchema), messageController.deleteMessage);
router.patch('/', validateReqBodySchema(updateMessageSchema), messageController.updateMessage);
export default router;
