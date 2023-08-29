import { mockUser, prismaMock } from '../../../../lib';
import { getAllUsersOperation } from './getAllUsersOperation';

describe('getAllUsersOperation', () => {
  it('should return all users', async () => {
    const mockUsers = [{ ...mockUser }, { ...mockUser }];

    prismaMock.users.findMany.mockResolvedValue(mockUsers);

    const users = await getAllUsersOperation();

    expect(users).toHaveLength(2);
  });
});
