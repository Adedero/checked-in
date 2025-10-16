import path from 'node:path';
import fs from 'node:fs';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export class Logger {
  private static instance: Logger;
  private logger: winston.Logger;
  private logsDir = path.resolve('logs');
  private customColors: { [key: string]: string } = {
    fatal: 'magenta',
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'green'
  };

  private constructor() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }

    winston.addColors(this.customColors);

    this.logger = winston.createLogger({
      levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4
      },
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.colorize({ all: true }),
            winston.format.printf(({ timestamp, level, message }) => {
              return `${timestamp} [${level}]: ${message}`;
            })
          )
        }),
        process.env.NODE_ENV === 'production' &&
          new DailyRotateFile({
            filename: path.join(this.logsDir, 'site-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: 20 * 1024 * 1024,
            maxFiles: 14,
            level: 'info'
          })
      ].filter(Boolean) as winston.transport[]
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(...args: unknown[]): string {
    return args
      .map((arg) => {
        if (typeof arg === 'string') return arg;
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      })
      .join(' ');
  }

  public info(...args: unknown[]): void {
    const message = this.formatMessage(...args);
    this.logger.info(message);
  }

  public warn(...args: unknown[]): void {
    const message = this.formatMessage(...args);
    this.logger.warn(message);
  }

  public debug(...args: unknown[]): void {
    const message = this.formatMessage(...args);
    this.logger.debug(message);
  }

  public error(...args: unknown[]): void {
    const lastArg = args[args.length - 1];
    const isLastArgError = lastArg instanceof Error;

    if (isLastArgError) {
      const messageArgs = args.slice(0, -1);
      const error = lastArg as Error;

      const baseMessage =
        messageArgs.length > 0 ? this.formatMessage(...messageArgs) : '';

      const errorDetails = `\nError: ${error.message}\nStack Trace: ${error.stack}`;

      this.logger.error(
        baseMessage ? `${baseMessage}${errorDetails}` : errorDetails
      );
    } else {
      const message = this.formatMessage(...args);
      this.logger.error(message);
    }
  }

  public fatal(...args: unknown[]): void {
    const lastArg = args[args.length - 1];
    const isLastArgError = lastArg instanceof Error;

    if (isLastArgError) {
      const messageArgs = args.slice(0, -1);
      const error = lastArg as Error;

      const baseMessage =
        messageArgs.length > 0 ? this.formatMessage(...messageArgs) : '';

      const errorDetails = `\nError: ${error.message}\nStack Trace: ${error.stack}`;

      this.logger.log(
        'fatal',
        baseMessage ? `${baseMessage}${errorDetails}` : errorDetails
      );
    } else {
      const message = this.formatMessage(...args);
      this.logger.log('fatal', message);
    }
  }
}

export const logger = Logger.getInstance();
