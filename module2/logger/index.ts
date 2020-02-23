import winston from 'winston';
import config from '../config';

const logger = winston.createLogger({
   level: config.get('env') === 'production' ? 'info' : 'debug',
   format: winston.format.json(),
   transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
   ]
});

if (config.get('logging_level') !== 'production') {
   logger.add(new winston.transports.Console({
      format: winston.format.simple()
   }));
}

export default logger;
