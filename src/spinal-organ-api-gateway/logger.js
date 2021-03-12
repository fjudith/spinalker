const { createLogger, format, transports } = require('winston')
const chalk = require('chalk').default
const { combine, colorize, label, printf, splat, timestamp } = format

const logFormat = (loggerLabel) => combine(
  timestamp(),
  splat(),
  colorize(),
  label({ label: loggerLabel }),
  printf(info => `${info.timestamp} ${chalk.magenta(info.label)} ${info.level}: ${info.message}`)
);

const createLoggerWithLabel = (label) => createLogger({
  level: 'info',
  format: logFormat(label)
});

const managementLogger = createLoggerWithLabel('[SpinalAPI:management]')
const requestsLogger = createLoggerWithLabel('[SpinalAPI:requests]')

if (process.env.NODE_ENV !== 'production') {
  managementLogger.add(new transports.Console())
  requestsLogger.add(new transports.Console())
}

module.exports = {
  management: managementLogger,
  requests: requestsLogger
}
