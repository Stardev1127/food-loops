import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment-timezone';
import Joi from 'joi';
import AppError from '../../shared/utils/appError';
import MenuItem from '../../shared/models/menuItemModel';
import { validateSchema } from '../../shared/utils/validator';

const oderedItemSchema = Joi.object()
  .keys({
    menuItem: Joi.string().required(),
    quantity: Joi.number().required()
  })
  .unknown(true);

const checkoutBodySchema = Joi.object({
  deliveryDate: Joi.date().required(),
  deliveryTime: Joi.string()
    .pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      'string.pattern.base': 'deliveryTime must be in hh:mm format'
    }),
  menuItems: Joi.array().items(oderedItemSchema).required()
}).unknown(true);

export const validateCheckout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { deliveryDate, deliveryTime, menuItems } = req.body;
  const orderedItems: { menuItem: string; quantity: number; price: number }[] = [];

  validateSchema(checkoutBodySchema, req.body);

  // eslint-disable-next-line no-restricted-syntax
  for (const item of menuItems) {
    // eslint-disable-next-line no-await-in-loop
    const orderedItem = await MenuItem.findById(item.menuItem);
    if (orderedItem)
      orderedItems.push({ menuItem: item.menuItem, quantity: item.quantity, price: orderedItem.price * item.quantity });
  }

  if (orderedItems.length <= 0) throw new AppError('Order menu items empty or not valid', StatusCodes.BAD_REQUEST);

  req.body.orderedItems = orderedItems;
  req.body.deliveryDate = moment.tz(`${deliveryDate} ${deliveryTime}`, 'Asia/Kathmandu'); // converting to Asia/Kathmandu
  next();
};
