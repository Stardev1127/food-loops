import mongoose from 'mongoose';
import Joi from 'joi';
import ICustomer from '../interfaces/ICustomer';

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide a first name']
    },
    lastName: {
      type: String,
      required: [true, 'Please provide a last name']
    },
    address: {
      type: String,
      required: [true, 'Please provide a address']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
      trim: true,
      // eslint-disable-next-line no-useless-escape
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    countryCode: {
      type: String,
      default: '+977'
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      minlength: [10, 'Please enter 10 digit number'],
      maxlength: [10, 'Please enter 10 digit number']
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

export const _customerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required()
}).unknown(true);

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);

export default Customer;
