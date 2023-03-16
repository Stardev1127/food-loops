import mongoose from 'mongoose';
import { NUTRIENTS } from '../../constants';
import IMenuItem from '../interfaces/IMenuItem';

export const nutrientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide nutrient name'],
    enum: NUTRIENTS.map((n) => n.name)
  },
  unit: {
    type: String,
    required: [true, 'Please provide nutrient unit']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide a nutrient amount']
  }
});

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide food name']
  },
  description: {
    type: String,
    required: [true, 'Please provide food description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide food price (NPR)']
  },
  servingSize: {
    type: Number,
    required: [true, 'Please provide serving size (Oz)']
  },
  photo: {
    type: String
  },
  isHotMeal: {
    type: Boolean,
    default: false
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  types: [
    {
      type: String,
      required: [true, 'Please provide a dish type'],
      enum: ['Veg', 'Non-Veg', 'Vegan']
    }
  ],
  categories: [
    {
      type: String,
      required: [true, 'Please provide a category name'],
      enum: ['Beverages', 'Breakfast', 'Lunch', 'Dinner']
    }
  ],
  nutrients: [nutrientSchema]
});

const MenuItem = mongoose.model<IMenuItem>('MenuItem', menuItemSchema);

export default MenuItem;
