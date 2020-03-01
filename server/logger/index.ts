import winston from 'winston';
import config from '../configs/config';

export type Logger = ReturnType<typeof winston.createLogger>;

const logger = winston.createLogger({
   level: config.get('env') === 'production' ? 'info' : 'debug',
   format: winston.format.json(),
   transports: [
      new winston.transports.File({ filename: './logs/info.log', level: 'info' }),
      new winston.transports.File({ filename: './logs/warn.log', level: 'warn' }),
      new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: './logs/combined.log' })
   ]
});

if (config.get('logging_level') !== 'production') {
   logger.add(new winston.transports.Console({
      format: winston.format.simple()
   }));
}

export default logger;
