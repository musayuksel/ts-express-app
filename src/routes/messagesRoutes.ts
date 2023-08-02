import express from 'express';
import { messageController } from '../controllers';
import { validateReqBodySchema } from '../middlewares/validateReqBodySchema';
import { validateReqParamSchema } from '../middlewares/validateReqParamSchema';
import { logBody } from '../middlewares/messageMiddleware';
import { userIdParamSchema, messageSchema } from '../schemas';
import { upload } from '../middlewares/multerMiddleware';
const router = express.Router();

router.get('/', messageController.getAllMessages);
router.get('/:userId', validateReqParamSchema(userIdParamSchema), messageController.getUserMessages);
router.post('/', logBody, validateReqBodySchema(messageSchema), messageController.createMessage);
router.post('/upload', upload.single('attachment'), messageController.uploadFile);

export default router;
