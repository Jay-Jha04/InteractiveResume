const { createLogger } = require("winston");
const winston = require("winston");

module.exports = function (error, req, res, next) {
  const logger = createLogger({
    transports: [new winston.transports.File({ filename: "logFile.log" })],
  });

  logger.error(error.message, error);
  console.log(error.message, error);
};
