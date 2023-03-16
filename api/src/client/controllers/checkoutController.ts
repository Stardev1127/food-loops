import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import factoryService from '../../shared/services/factoryService';
import { IRequest } from '../../shared/interfaces/IRequest';
import Customer from '../../shared/models/customerModel';
import CustomerOrder from '../../shared/models/customerOrderModel';

const checkout = async (req: IRequest, res: Response): Promise<void> => {
  const { firstName, lastName, address, email, phoneNumber, orderedItems, deliveryDate } = req.body;

  const customer = await factoryService.createOne(Customer, {
    firstName,
    lastName,
    address,
    email,
    phoneNumber
  });

  await factoryService.createOne(CustomerOrder, {
    deliveryDate,
    customer,
    orderedItems
  });

  res.status(StatusCodes.NO_CONTENT).json({
    status: 'success'
  });
};

export default { checkout };
