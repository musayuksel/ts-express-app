import express from 'express';
import { userController } from '../controllers';
import { validateReqBodySchema } from '../middlewares/validateReqBodySchema';
import { userSchema } from '../schemas';
import { updateUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', validateReqBodySchema(userSchema), userController.createNewUser);
router.patch('/', validateReqBodySchema(updateUserSchema), userController.updateUser);

export default router;
