import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MenuItem from '../../shared/models/menuItemModel';
import factoryService from '../../shared/services/factoryService';

const getAllMenu = async (req: Request, res: Response): Promise<void> => {
  req.query = { ...req.query, isEnabled: true } as any;
  const [menuItems, total, size] = await factoryService.getAll(MenuItem, req.query as any);

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      total,
      size,
      menuItems
    }
  });
};

const getMenuItemById = async (req: Request, res: Response): Promise<void> => {
  const menuItem = await factoryService.getOneById(MenuItem, req.params.menuItem, 'Menu item');

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      menuItem
    }
  });
};

export default { getAllMenu, getMenuItemById };
