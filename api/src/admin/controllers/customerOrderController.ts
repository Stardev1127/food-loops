import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomerOrder from '../../shared/models/customerOrderModel';
import factoryService from '../../shared/services/factoryService';

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  const [orders, total, size] = await factoryService.getAll(CustomerOrder, req.query as any, 'customer');

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      total,
      size,
      orders
    }
  });
};

const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const order = await factoryService.getOneById(CustomerOrder, req.params.orderId, 'Customer order', [
    { path: 'customer' },
    { path: 'orderedItems.menuItem' }
  ]);

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      order
    }
  });
};

export default { getAllOrders, getOrderById };
