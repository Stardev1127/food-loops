import { Document } from 'mongoose';

export interface ICustomerType {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: number;
}

export default interface ICustomer extends Document, ICustomerType {}
