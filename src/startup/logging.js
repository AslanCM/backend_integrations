const winston = require('winston');

const formatLogger = process.env.NODE_ENV === 'local'
  ? winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint(),
    )
  : winston.format.json();

const logger = winston.createLogger({
  level: 'info',
  format: formatLogger,
  transports: [
    new winston.transports.Console(),
  ],
  exitOnError: false,
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception thrown:', error);
  process.exit(1);
});

module.exports = logger;
