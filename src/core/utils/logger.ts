/**
 * Centralized logging utility
 * Replace all console.log/error with this for better control
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private log(level: LogLevel, message: string, ...args: unknown[]): void {
    if (!this.isDevelopment && level === 'debug') return;

    const prefix = `[${level.toUpperCase()}]`;
    const timestamp = new Date().toISOString();
    
    switch (level) {
      case 'error':
        console.error(prefix, timestamp, message, ...args);
        break;
      case 'warn':
        console.warn(prefix, timestamp, message, ...args);
        break;
      default:
        console.log(prefix, timestamp, message, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, ...args);
  }

  error(message: string, error?: Error | unknown, ...args: unknown[]): void {
    let errorDetails: string;
    
    if (error instanceof Error) {
      errorDetails = error.message;
      if (error.stack) {
        errorDetails += `\nStack: ${error.stack}`;
      }
    } else if (typeof error === 'object' && error !== null) {
      errorDetails = JSON.stringify(error, null, 2);
    } else {
      errorDetails = String(error);
    }
    
    this.log('error', message, errorDetails, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.log('debug', message, ...args);
  }
}

export const logger = new Logger();

