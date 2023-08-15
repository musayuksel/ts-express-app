import { Request, Response, NextFunction } from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { s3 } from './utils/configureAWS';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const generateS3SignInUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // replace spaces with underscore '_' and add unique prefix
    const storageFileName = `${uuidv4()}-${req.body.fileName.replace(/ /g, '_')}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: storageFileName,
    };

    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.json({
      message: 'Signed URL generated successfully',
      fileName: storageFileName,
      signedUrl: signedUrl,
    });
  } catch (error) {
    next(error);
  }
};
