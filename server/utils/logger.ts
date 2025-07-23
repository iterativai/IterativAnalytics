
interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
  [key: string]: any;
}

class Logger {
  private log(level: string, message: string, meta: any = {}) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...meta
    };

    // Console output for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${entry.timestamp}] ${level.toUpperCase()}: ${message}`, meta);
    } else {
      console.log(JSON.stringify(entry));
    }
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: any) {
    this.log('error', message, meta);
  }

  debug(message: string, meta?: any) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, meta);
    }
  }
}

export const logger = new Logger();
