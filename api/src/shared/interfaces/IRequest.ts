import { Request } from 'express';
import ICustomer from './ICustomer';
import IMenuItem from './IMenuItem';
import IStaff from './IStaff';

export interface IRequest extends Request {
  staff?: IStaff;
  customer?: ICustomer;
  menuItem?: IMenuItem;
}
