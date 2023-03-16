import mongoose, { HookNextFunction } from 'mongoose';
import { config } from '../../config';
import ICustomerOrder from '../interfaces/ICustomerOrder';

export const orderedItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Types.ObjectId,
    ref: 'MenuItem',
    required: [true, 'Please specify a menu item id']
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide food price (NPR)']
  },
  price: {
    type: Number,
    required: [true, 'Please provide food price (NPR)']
  },
  remarks: String
});

const customerOrderModelSchema = new mongoose.Schema({
  deliveryCharge: {
    type: Number,
    default: config.deliveryCharge,
    required: [true, 'Please provide a delivery charge']
  },
  totalCost: Number,
  deliveryDate: {
    type: Date,
    default: Date.now,
    required: [true, 'Please provide a delivery date']
  },
  orderedDate: {
    type: Date,
    default: Date.now
  },
  remarks: String,
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Please specify a customer id']
  },
  orderedItems: [orderedItemSchema]
});

customerOrderModelSchema.pre<ICustomerOrder>('save', function (next: HookNextFunction) {
  if (!this.isModified('orderedItems')) return next();

  this.totalCost = this.orderedItems.reduce((a, b) => a + b.price, 0) + this.deliveryCharge;
  next();
});

const CustomerOrder = mongoose.model<ICustomerOrder>('CustomerOrder', customerOrderModelSchema);

export default CustomerOrder;
