import { mockUser, prismaMock } from '../../../../lib';
import { createNewUserOperation } from './createNewUserOperation';

describe('createNewUserOperation', () => {
  it('should create a new user', async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);
    prismaMock.users.create.mockResolvedValue(mockUser);

    const createdUser = await createNewUserOperation(mockUser);

    expect(createdUser).toBe(mockUser);
  });

  it('should throw an error if user already exists', async () => {
    prismaMock.users.findUnique.mockResolvedValue(mockUser);

    await expect(() => createNewUserOperation(mockUser)).rejects.toThrow(
      `User with name "${mockUser.userName}" already exists`,
    );
  });
});
