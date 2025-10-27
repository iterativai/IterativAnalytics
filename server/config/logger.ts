/**
 * Structured Logging Module
 * Provides consistent logging across the application
 */

import { env } from './environment.js';

enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

const LOG_LEVELS: Record<string, LogLevel> = {
  error: LogLevel.ERROR,
  warn: LogLevel.WARN,
  info: LogLevel.INFO,
  debug: LogLevel.DEBUG,
};

class Logger {
  private static instance: Logger;
  private level: LogLevel;

  private constructor() {
    this.level = LOG_LEVELS[env.get('LOG_LEVEL')] || LogLevel.INFO;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaString = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaString}`;
  }

  private log(level: LogLevel, levelName: string, message: string, meta?: any): void {
    if (level <= this.level) {
      const formatted = this.formatMessage(levelName, message, meta);
      
      switch (level) {
        case LogLevel.ERROR:
          console.error(formatted);
          break;
        case LogLevel.WARN:
          console.warn(formatted);
          break;
        default:
          console.log(formatted);
      }
    }
  }

  public error(message: string, meta?: any): void {
    this.log(LogLevel.ERROR, 'error', message, meta);
  }

  public warn(message: string, meta?: any): void {
    this.log(LogLevel.WARN, 'warn', message, meta);
  }

  public info(message: string, meta?: any): void {
    this.log(LogLevel.INFO, 'info', message, meta);
  }

  public debug(message: string, meta?: any): void {
    this.log(LogLevel.DEBUG, 'debug', message, meta);
  }

  public setLevel(level: keyof typeof LOG_LEVELS): void {
    this.level = LOG_LEVELS[level];
  }
}

export const logger = Logger.getInstance();
export { LogLevel };
