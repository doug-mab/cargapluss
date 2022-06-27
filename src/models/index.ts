/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from 'sequelize';
import { logger } from '../util/logger';
import eventEmitter from '../util/eventEmitter';

interface ConfigSequelize {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'postgres';
  uri: string | null;
}

const config: ConfigSequelize = require('../config/database').default;

const sequelizeOptions = {
  dialect: config.dialect,
  logging: logger.debug.bind(logger),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
let sequelize: Sequelize;

if (config.uri) {
  sequelize = new Sequelize(config.uri, sequelizeOptions);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    ...sequelizeOptions,
  });
}

sequelize
  .authenticate()
  .then(() => {
    logger.info('Successfully connected!');
    eventEmitter.emit('connect');
  })
  .catch(() =>
    logger.error('Something went wrong connecting to the database.'),
  );
