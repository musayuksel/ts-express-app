import express from 'express';
import { userController } from '../controllers';
import { validateReqBodySchema } from '../middlewares/validateReqBodySchema';
import { userSchema } from '../schemas';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', validateReqBodySchema(userSchema), userController.createNewUser);

export default router;
