import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Custom log format
const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}]: ${message}`; // No .toUpperCase()
});

// Create the logger instance
const logger = createLogger({
  level: 'info', // Default log level
  transports: [
    new transports.Console({
      format: combine(
        colorize({ all: true }), // Add colors to levels
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Include timestamp
        customFormat // Format the output
      ),
    }),
    new transports.File({
      filename: 'logs/app.log',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Include timestamp
        customFormat // Clean format for file
      ),
    }),
  ],
});

export default logger;
