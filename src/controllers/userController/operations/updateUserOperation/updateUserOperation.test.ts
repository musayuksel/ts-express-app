import { mockUser, prismaMock } from '../../../../lib';
import { updateUserOperation } from './updateUserOperation';

describe('updateUserOperation', () => {
  it('should update a user', async () => {
    const mockUserPayload = {
      id: 'uuid_random_user_id',
      userName: 'testUserName',
      firstName: 'updated testFirstName',
    };
    prismaMock.users.findUnique.mockResolvedValue(mockUser);
    prismaMock.users.update.mockResolvedValue({ ...mockUser, firstName: 'updated testFirstName' });

    const updatedUser = await updateUserOperation(mockUserPayload);

    expect(updatedUser.firstName).toBe(mockUserPayload.firstName);
  });

  it('should throw an error if user does not exist', async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);

    await expect(() => updateUserOperation(mockUser)).rejects.toThrow('User not found');
  });
});
