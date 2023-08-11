import { Response, Request, NextFunction } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CustomError } from './globalErrorHandler';

export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
  //   const verifier = CognitoJwtVerifier.create({
  //     region: process.env.AWS_REGION || 'eu-west-2',
  //     tokenUse: 'access',
  //     userPoolId: process.env.AWS_COGNITO_USER_POOL_ID || 'eu-west-2_V',
  //     clientId: process.env.AWS_COGNITO_CLIENT_ID,
  //   });
  const verifier = CognitoJwtVerifier.create({
    region: 'eu-west-2',
    tokenUse: 'access',
    userPoolId: 'eu-west-2_VUdj4DoBW',
    clientId: '229j8tmhe7ro5s6dtgcj2fa73e',
  });

  const accessToken = req.headers.authorization?.split(' ')[1] || '';

  if (!accessToken) {
    const error = new CustomError('Access token is missing!!!', 401);
    next(error);
    return;
  }

  try {
    const decodedToken = await verifier.verify(accessToken);
    req.currentUser = decodedToken;
    next();
  } catch (error) {
    const customError = new CustomError('Invalid access token', 401);
    next(customError);
  }
};
