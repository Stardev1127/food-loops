import { StatusCodes } from 'http-status-codes';
import multer, { FileFilterCallback } from 'multer';
import AppError from '../utils/appError';
import { IRequest } from '../interfaces/IRequest';
import { config } from '../../config';

const multerStorage = multer.memoryStorage();

const multerFilter = (req: IRequest, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', StatusCodes.BAD_REQUEST));
  }
};

export const imageUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: config.maxSizeUpload }
});
