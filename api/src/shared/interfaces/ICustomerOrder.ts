import { Document, Types } from 'mongoose';
import ICustomer from './ICustomer';

export interface IOrderedItemType {
  menuItem: string;
  quantity: number;
  price: number;
  remarks?: string;
}
export interface IOrderedItem extends Document, IOrderedItemType {}

export interface ICustomerOrderType {
  totalCost?: number;
  deliveryCharge?: number;
  deliveryDate: Date | string;
  orderedDate?: Date | string;
  remarks?: string;
  customer: ICustomer | string;
  orderedItems: Types.Array<IOrderedItem>;
}

export default interface ICustomerOrder extends Document, ICustomerOrderType {}
