import winston, { Logger } from 'winston';
import { config, keys } from '../../config';
import 'winston-mongodb';

// eslint-disable-next-line import/no-mutable-exports
let logger: Logger;
const { transports }: any = winston;

if (process.env.NODE_ENV === config.envs.TEST) {
  logger = winston.createLogger({
    transports: [new transports.Console({ level: 'error' })]
  });
} else {
  logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.prettyPrint(), winston.format.metadata()),
    transports: [new transports.Console()]
  });

  logger.add(
    new transports.MongoDB({
      db: keys.MONGO_URI,
      options: {
        useUnifiedTopology: true
      },
      level: 'error'
    })
  );
}
export default logger;
