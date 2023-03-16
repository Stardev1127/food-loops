/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';
import express from 'express';
import loadDB from './startup/db';
import loadModules from './startup/modules';
import errorHandler from './shared/middlewares/error';
import loadRoutes from './startup/routes';

// Changing default timezone
process.env.TZ = 'Europe/Amsterdam';

const app = express();

app.use(express.static('build'));

loadModules(app);
loadRoutes(app);
loadDB();

app.use(errorHandler);

export default app;
