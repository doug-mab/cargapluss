import pino, { stdTimeFunctions } from 'pino';

const log = pino({
  enabled: !process.env.LOG_DISABLED,
  timestamp: stdTimeFunctions.isoTime,
  level: process.env.DEBUG_LOG ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export const logger = log;
