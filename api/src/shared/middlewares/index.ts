import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema } from 'joi';
import AppError from '../utils/appError';
import { validateSchema } from '../utils/validator';

export function schemaValidator(joiSchema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    validateSchema(joiSchema, req.body);
    next();
  };
}

export function requiredFile(req: Request, res: Response, next: NextFunction): void {
  if (!req.file) throw new AppError('Missing file', StatusCodes.BAD_GATEWAY);
  next();
}
