import app from './app';
import config from './config/appConfig';
import { logger } from './util/logger';

app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}...`);
});
