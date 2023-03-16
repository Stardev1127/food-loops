import app from './app';
import logger from './shared/utils/logger';
import { STARTUP_MESSAGE } from './constants';

// Handle uncaught exceptions (bugs) - Synchronous
process.on('uncaughtException', (err: Error) => {
  logger.info('UNHANDLED EXCEPTION 💥 SHUTTING DOWN...');
  logger.error(err.name, err);
  process.exit(1);
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(STARTUP_MESSAGE);
  logger.info(`✅ Server listening on port ${PORT}`);
  logger.info(`🚀 Deploy stage: ${process.env.NODE_ENV}${process.env.STAGING ? ' staging' : ''}`);
});

// Handle unhandled promise rejection - Asynchronous
process.on('unhandledRejection', (err: Error) => {
  logger.info('UNHANDLED REJECTION 💥 SHUTTING DOWN...');
  logger.error(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});
