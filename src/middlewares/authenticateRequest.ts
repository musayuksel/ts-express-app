import { Response, Request, NextFunction } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CustomError } from './globalErrorHandler';

export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
  const AWS_REGION = process.env.AWS_REGION;
  const AWS_COGNITO_USER_POOL_ID = process.env.AWS_COGNITO_USER_POOL_ID;
  const AWS_COGNITO_USER_POOL_CLIENT_ID = process.env.AWS_COGNITO_USER_POOL_CLIENT_ID;

  if (!AWS_REGION || !AWS_COGNITO_USER_POOL_ID || !AWS_COGNITO_USER_POOL_CLIENT_ID) {
    throw new Error('Missing AWS Cognito config');
  }

  const verifier = CognitoJwtVerifier.create({
    region: AWS_REGION,
    tokenUse: 'access',
    userPoolId: AWS_COGNITO_USER_POOL_ID,
    clientId: AWS_COGNITO_USER_POOL_CLIENT_ID,
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
    console.info({ currentUser: req.currentUser });
    next();
  } catch (error) {
    const customError = new CustomError('Invalid access token', 401);
    next(customError);
  }
};
