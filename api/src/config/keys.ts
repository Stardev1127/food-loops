import prodKeys from './prod';
import devKeys from './dev';
import ciKeys from './ci';
import { config } from '.';

type Config = {
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_ACCESS_KEY: string;
  AWS_BUCKET: string;
};
// eslint-disable-next-line import/no-mutable-exports
let keys: Config;

if (process.env.NODE_ENV === config.envs.PROD) keys = prodKeys;
else if (process.env.NODE_ENV === config.envs.TEST) keys = ciKeys;
else keys = devKeys;

export { keys };
