import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';
import { Application } from 'express';
import { config } from '../config';

export default function (app: Application): void {
  // If server is running in staging mode or development mode
  if (process.env.STAGING || process.env.NODE_ENV === config.envs.DEV) app.use(morgan('dev'));

  app.use(cors({ origin: config.CORS_WHITELISTS, credentials: true }));

  app.use(
    helmet({
      contentSecurityPolicy: false
    })
  );
  // Data sanitization against NOSQL query injection
  app.use(mongoSanitize());
  // Data sanitization against XSS
  app.use(xss());
  // For response compression i.e html, json...
  app.use(compression());

  // If server is running in production mode
  if (process.env.NODE_ENV === config.envs.PROD && !process.env.STAGING) {
    /*
     * Allow 300 requests from the same ip in 1 hour
     * if the threshold exceeds send an error with the message
     */
    const limiter = rateLimit({
      max: 300,
      windowMs: 60 * 60 * 1000,
      message: 'Too many requests from this IP, please try again in an hour'
    });
    // Apply the limiter only to route starting with /api
    app.use('/api', limiter);
  }
}
