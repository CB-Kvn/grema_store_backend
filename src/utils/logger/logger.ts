import pino, { LoggerOptions } from 'pino';

// Configura el logger para imprimir solo en la consola
const loggerOptions: LoggerOptions = {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // Color para facilitar la lectura en consola
    },
  },
};

// Crear instancia del logger para consola
const logger = pino(loggerOptions);

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
  logger.error(err, 'Unhandled exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(reason, 'Unhandled rejection');
  process.exit(1);
});

export default logger