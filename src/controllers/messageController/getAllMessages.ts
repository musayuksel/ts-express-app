import { Request, Response, NextFunction } from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Message } from '../../models/message';

export const getAllMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Message.findAll();
    // TODO: add a URL to the message object that points to the image in S3

    async function addSignedUrlToMessage(currentMessage: Message | undefined): Promise<string> {
      const messageKey = currentMessage?.dataValues.attachment || undefined;
      const getObjectParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: messageKey,
      };
      const command2 = new GetObjectCommand(getObjectParams);

      const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
      });
      // create a url that expires in 7 days
      const url = await getSignedUrl(s3, command2, { expiresIn: 604800 });
      return url;
    }
    const messagesWithSignedUrl = messages.map(async (currentMessage) => {
      const url = currentMessage.dataValues.attachment ? await addSignedUrlToMessage(currentMessage) : null;
      console.log({ url });
      const mesageWithUrl = {
        ...currentMessage.dataValues,
        attachment: url,
      };

      return mesageWithUrl;
    });
    console.log({ messagesWithSignedUrl });
    res.json(await Promise.all(messagesWithSignedUrl));
  } catch (error) {
    next(error);
  }
};
