var winston = require('winston');
var Papertrail = require('winston-papertrail').Papertrail;

var papertrail = new Papertrail({
  host: 'logs5.papertrailapp.com',
  port: 52312,
  colorize: true,
});

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    }),
    papertrail,
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

module.exports = logger;
