import { StatusCodes } from 'http-status-codes';
import IStaff from '../../shared/interfaces/IStaff';
import Staff from '../../shared/models/staffModel';
import AppError from '../../shared/utils/appError';

/**
 * @param  {string} email email
 * @param  {string} password password
 * @returns {Promise} Promise object represents token and current user
 */
export async function loginService(email: string, password: string): Promise<{ token: string; user: IStaff }> {
  // 2) Check if staff with admin role exists && password is correct
  const user = await Staff.findOne({ email }).select('+password');

  if (!user || !(await user.validatePassword(password, user.password)))
    throw new AppError('Incorrect email or password', StatusCodes.UNAUTHORIZED);

  const token = user.generateAuthToken();

  // Remove password from output
  // eslint-disable-next-line no-param-reassign
  user.password = undefined;

  // 3) If everything ok, send token to client
  return { token, user };
}
