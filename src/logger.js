const winston = require('winston');
const {format} = winston;
export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.colorize({all: true}),
      format.printf(
          info => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
});
