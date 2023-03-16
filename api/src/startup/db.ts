import mongoose from 'mongoose';
import logger from '../shared/utils/logger';
import { keys } from '../config';

export default function (): void {
  mongoose
    .connect(keys.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => logger.info(`🗄  Connected to MongoDB`));
}
