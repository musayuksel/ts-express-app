import { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model';

declare module 'express' {
  interface Request {
    currentUser?: CognitoAccessTokenPayload;
  }
}
