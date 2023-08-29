import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../configureAWS';
import { AddSignedUrlToMessageTypes } from './addSignedUrlToMessage.types';

export const addSignedUrlToMessage = async (attachment: AddSignedUrlToMessageTypes) => {
  const messageKey = attachment.attachment || undefined;

  const getObjectParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: messageKey,
  };
  const command = new GetObjectCommand(getObjectParams);

  // create a url that expires in 7 days
  return await getSignedUrl(s3, command, { expiresIn: 604800 });
};
