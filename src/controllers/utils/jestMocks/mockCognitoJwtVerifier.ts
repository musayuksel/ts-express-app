export const mockCognitoJwtVerifier = {
  create: () => ({
    verify: (token: string) => {
      if (token === 'mockToken') {
        return { username: 'mockUsername' };
      }
      throw new Error('mock aws error');
    },
  }),
};
