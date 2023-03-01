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
    new _transports.File({ filename: 'v1/src/logs/sections/error.log', level: 'error' }),
    new _transports.File({ filename: 'v1/src/logs/sections/info.log', level: 'info' }),
    new _transports.File({ filename: 'v1/src/logs/sections/combined.log' }),
  ], 
});

export default logger;