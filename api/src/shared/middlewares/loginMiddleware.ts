import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/appError';

export const validateFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) throw new AppError('Please provide email and password!', StatusCodes.BAD_REQUEST);
  next();
};
