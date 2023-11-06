import { getAllUsers } from './getAllUsers';
import { getCurrentUserInformation } from './getCurrentUserInformation';
import { createNewUser } from './createNewUser';
import { updateUser } from './updateUser';

const userController = {
  getAllUsers,
  getCurrentUserInformation,
  createNewUser,
  updateUser,
};

export default userController;
