import { createLogger, format as _format, transports as _transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: _format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new _transports.File({ filename: 'v1/src/logs/users/error.log', level: 'error' }),
    new _transports.File({ filename: 'v1/src/logs/users/info.log', level: 'info' }),
    new _transports.File({ filename: 'v1/src/logs/users/combined.log' }),
  ], 
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new _transports.Console({
    // format: _format.simple(),
//   }));
// }

export default logger;