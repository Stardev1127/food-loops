import { Application } from 'express';
import checkoutRouter from './checkoutRoutes';
import menuItemRouter from './menuItemRoutes';

export default function (app: Application): void {
  app.use('/api/checkout', checkoutRouter);
  app.use('/api/menu', menuItemRouter);
}
