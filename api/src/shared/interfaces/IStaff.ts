import { Document } from 'mongoose';

export interface IStaffType {
  name?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  role: string;
  password?: string;
  createdAt?: Date;
  passwordChangedAt?: number;
  enabled?: boolean;
  photo?: string;
  validatePassword(s: string, hash: string): Promise<boolean>;
  changedPasswordAfter(jwtIssuedTime: number): boolean;
  generateAuthToken(): string;
}

export default interface IStaff extends Document, IStaffType {}
