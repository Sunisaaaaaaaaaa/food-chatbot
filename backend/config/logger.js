const winston = require('winston')

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      const logData = {
        level,
        message: JSON.stringify(message),
        timestamp,
      }
      return JSON.stringify(logData)
    })
  ),
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
})

module.exports = logger
