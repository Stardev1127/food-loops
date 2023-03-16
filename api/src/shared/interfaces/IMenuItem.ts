import { Document, Types } from 'mongoose';

export interface INutrientType {
  name: string;
  unit: string;
}
export interface INutrient extends Document, INutrientType {}

export interface IMenuItemType {
  name: string;
  description: string;
  price: number;
  servingSize: number;
  photo?: string;
  isHotMeal?: boolean;
  isEnabled?: boolean;
  types: ['Veg' | 'Non-Veg' | 'Vegan'];
  categories: ['Beverages' | 'Breakfast' | 'Lunch' | 'Dinner'];
  nutrients: Types.Array<INutrient>;
}

export default interface IMenuItem extends Document, IMenuItemType {}
