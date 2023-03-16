import express, { Application, Request, Response } from 'express';
import path from 'path';
import adminRouter from '../admin/router';
import clientRouter from '../client/router';

export default function (app: Application): void {
  app.use(express.json());

  adminRouter(app);
  clientRouter(app);

  // If requested route is not matched with any
  app.all('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
  });
}
