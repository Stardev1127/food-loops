import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import MenuItem from '../../shared/models/menuItemModel';
import AppError from '../../shared/utils/appError';
import { StaffRequest } from '../interfaces/StaffRequest';

export const validateMenuItemId = async (req: StaffRequest, res: Response, next: NextFunction): Promise<void> => {
  const menuItem = await MenuItem.findById(req.params.menuItem);
  if (!menuItem) throw new AppError('Menu item with that id does not exist', StatusCodes.BAD_GATEWAY);

  req.menuItem = menuItem;
  next();
};
