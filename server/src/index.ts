import mongoose from 'mongoose';
import { CONFIG } from './config';
import { startServer, logger } from './server';

mongoose.set('strictQuery', false);

(async function main() {
  if (CONFIG.isDev) {
    logger.debug(CONFIG);
  }

  logger.info('Initializing...');

  try {
    logger.info('Connecting to DB...');
    await mongoose.connect(CONFIG.services.db);

    logger.info('Connected to DB');
  } catch (err) {
    logger.debug(err);
  }

  await startServer(CONFIG.port);
  logger.info('Service init is done');
})();
