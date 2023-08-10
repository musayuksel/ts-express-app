import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Message } from '../../../models/message';
import { s3 } from './configureAWS';

export const addSignedUrlToMessage = async (currentMessage: Message) => {
  const messageKey = currentMessage?.attachment || undefined;

  const getObjectParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: messageKey,
  };
  const command = new GetObjectCommand(getObjectParams);

  // create a url that expires in 7 days
  return await getSignedUrl(s3, command, { expiresIn: 604800 });
};
