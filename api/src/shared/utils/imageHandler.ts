import sharp from 'sharp';
import awsFileHandler from './awsFileHandler';

/**
 * @param  {Buffer} buffer image buffer
 * @param  {string} imageName image name
 * @returns Promise
 */
export const uploadImage = async (
  buffer: Buffer,
  imageName: string,
  width?: number,
  height?: number
): Promise<string> => {
  // eslint-disable-next-line no-param-reassign
  if (width && height) buffer = await sharp(buffer).resize(width, height).toBuffer();

  // upload image inside a public folder
  const key = `public/${imageName}`;
  return await awsFileHandler.uploadFile(buffer, key);
};

export const deleteImage = async (imageName: string): Promise<string> => {
  const key = `public/${imageName}`;
  return await awsFileHandler.fileDelete(key);
};

export default { uploadImage, deleteImage };
