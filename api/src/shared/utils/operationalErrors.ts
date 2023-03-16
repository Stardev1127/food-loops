import { StatusCodes } from 'http-status-codes';
import AppError from './appError';

function handleSyntaxError(err: AppError): AppError {
  const message = `Invalid data format`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleCastErrorDB(err: AppError): AppError {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleValidationErrorDB(err: AppError): AppError {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleMulterFieldError(err: AppError): AppError {
  const message = `Invalid image field '${err.field}'`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleMulterUploadLimitError(): AppError {
  const message = `Uploaded file size exceeded max size`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

function handleDuplicateFieldsDB(err: AppError): AppError {
  const duplicateField = err.message.split('index: ')[1].split('dup key')[0].split('_')[0];
  const message = `Duplicate field ${duplicateField}. Please use another value`;
  return new AppError(message, 400);
}

export default {
  handleSyntaxError,
  handleCastErrorDB,
  handleMulterFieldError,
  handleMulterUploadLimitError,
  handleValidationErrorDB,
  handleDuplicateFieldsDB
};
