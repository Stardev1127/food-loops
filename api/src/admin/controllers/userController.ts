import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import AppError from '../../shared/utils/appError';
import Staff from '../../shared/models/staffModel';
import factoryService from '../../shared/services/factoryService';
import { StaffRequest } from '../interfaces/StaffRequest';

const getAllUsers = async (req: StaffRequest, res: Response): Promise<void> => {
  const [users, total, size] = await factoryService.getAll(Staff, req.query as any);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      total,
      size,
      users
    }
  });
};

const updateUser = async (req: StaffRequest, res: Response): Promise<void> => {
  const userData = _.pick(req.body, ['name', 'email', 'phoneNumber']);
  const user = await factoryService.updateOne(Staff, null, userData as any, 'User', req.user);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user
    }
  });
};

const updateUserPassword = async (req: StaffRequest, res: Response): Promise<void> => {
  const { currentPassword, newPassword } = req.body;
  const { user } = req;

  if (!currentPassword || !newPassword)
    throw new AppError('Provide both current password and new password', StatusCodes.BAD_REQUEST);
  if (!(await user.validatePassword(currentPassword, user.password)))
    throw new AppError('Incorrect password', StatusCodes.BAD_REQUEST);

  // eslint-disable-next-line no-param-reassign
  user.password = newPassword;
  await user.save();
  const token = user.generateAuthToken();

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      token
    }
  });
};

export default { getAllUsers, updateUser, updateUserPassword };
