import AWS from '../../config/awsConfig';
import { keys } from '../../config';

const s3 = new AWS.S3();

/**
 * @param  {Buffer} fileBuffer file buffer
 * @param  {string} fileName file name
 * @param  {} contentType file content type
 * @returns Promise
 */
export const uploadFile = (fileBuffer: Buffer, fileName: string, contentType = 'image/jpg'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadParams = {
      Bucket: keys.AWS_BUCKET,
      Key: fileName,
      Body: fileBuffer,
      ContentType: contentType
    };

    s3.upload(uploadParams, function (err: Error, data: any) {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data.Location);
      }
    });
  });
};

export const fileDelete = (fileName: string): Promise<any> => {
  return new Promise((resolve) => {
    const params = {
      Bucket: keys.AWS_BUCKET,
      Key: fileName
    };

    s3.deleteObject(params, function (err: Error, data: any) {
      resolve(data);
    });
  });
};

export default { uploadFile, fileDelete };
