import { LoggerService, Injectable } from '@nestjs/common';
import { stdout } from 'process';

const log_levels = ['log', 'error', 'warn', 'debug', 'verbose'];
const LOG_LEVEL =
  +process.env.LOG_LEVEL < 5
    ? log_levels.slice(0, +process.env.LOG_LEVEL + 1)
    : log_levels;
const LOG_MODE =
  process.env.LOG_MODE === 'console' || process.env.LOG_MODE === 'file'
    ? process.env.LOG_MODE
    : 'console';

@Injectable()
export class LogService implements LoggerService {
  private readonly level: string[];
  private readonly mode: 'console' | 'file';
  private readonly target: any;

  constructor() {
    this.level = LOG_LEVEL;
    this.mode = LOG_MODE;
  }

  log(message: string) {
    switch (this.mode) {
      case 'console':
        {
          stdout.write(` [LOG]  ${new Date().toLocaleString()} - ${message}\n`);
        }
        break;
      case 'file':
        {
        }
        break;
      default:
        return;
    }
  }

  error(message: string) {
    if (this.level.length < 2) {
      return;
    }
    switch (this.mode) {
      case 'console':
        {
          stdout.write(`[ERROR] ${new Date().toLocaleString()} - ${message}\n`);
        }
        break;
      case 'file':
        {
        }
        break;
      default:
        return;
    }
  }

  warn(message: string) {
    if (this.level.length < 3) {
      return;
    }
    switch (this.mode) {
      case 'console':
        {
          stdout.write(` [WARN] ${new Date().toLocaleString()} - ${message}\n`);
        }
        break;
      case 'file':
        {
        }
        break;
      default:
        return;
    }
  }

  debug(message: string) {
    if (this.level.length < 3) {
      return;
    }
    switch (this.mode) {
      case 'console':
        {
          stdout.write(` [WARN] ${new Date().toLocaleString()} - ${message}\n`);
        }
        break;
      case 'file':
        {
        }
        break;
      default:
        return;
    }
  }

  verbose(message: string) {
    if (this.level.length < 3) {
      return;
    }
    switch (this.mode) {
      case 'console':
        {
          stdout.write(` [WARN] ${new Date().toLocaleString()} - ${message}\n`);
        }
        break;
      case 'file':
        {
        }
        break;
      default:
        return;
    }
  }


}
