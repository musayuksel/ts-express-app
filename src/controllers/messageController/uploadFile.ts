import { Request, Response, NextFunction } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  });

  try {
    const file = req.file;
    // replace spaces with underscore '_' and add unique prefix
    const fileName = `${uuidv4()}-${file?.originalname.replace(/ /g, '_')}`;
    const fileContent = file?.buffer;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      contentType: file?.mimetype,
    };

    const command = new PutObjectCommand(params);
    const data = await s3.send(command);

    res.json({
      message: 'Image uploaded successfully',
      data,
      fileName: fileName,
    });
  } catch (error) {
    next(error);
  }
};
