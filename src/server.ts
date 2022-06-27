import app from './app';
import config from './config/appConfig';
import { logger } from './util/logger';
import eventEmitter from './util/eventEmitter';

eventEmitter.on('connect', () => {
  app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}...`);
  });
});
