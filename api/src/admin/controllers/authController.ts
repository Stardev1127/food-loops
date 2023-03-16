import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { StaffRequest } from '../interfaces/StaffRequest';
import { IRequest } from '../../shared/interfaces/IRequest';
import { loginService } from '../services/authService';

const login = async (req: IRequest, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { token, user } = await loginService(email, password);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      token,
      user
    }
  });
};

const getLoggedInUser = async (req: StaffRequest, res: Response): Promise<void> => {
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
};

export default {
  login,
  getLoggedInUser
};
