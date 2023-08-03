import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Message } from '../../../models/message';

export const addSignedUrlToMessage = async (currentMessage: Message | undefined): Promise<string> => {
  const messageKey = currentMessage?.dataValues.attachment || undefined;

  const getObjectParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: messageKey,
  };
  const command = new GetObjectCommand(getObjectParams);

  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  });
  // create a url that expires in 7 days
  return await getSignedUrl(s3, command, { expiresIn: 604800 });
};
