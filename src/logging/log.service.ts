import { LoggerService, Injectable } from '@nestjs/common';
import { stdout } from 'process';
import { FileWriter } from './writer';

const writer = new FileWriter();
(async () => await writer.initializing())();

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
  private readonly writer: FileWriter;

  constructor() {
    this.level = LOG_LEVEL;
    this.mode = LOG_MODE;
    if (this.mode === "file") {
      this.writer = writer;
    }
  }

  log(message: string) {
    const data = ` [LOG]  ${new Date().toLocaleString()} - ${message}\n`
    switch (this.mode) {
      case 'console':
        {
          stdout.write(data);
        }
        break;
      case 'file':
        {
          this.writer.write(data);
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
    const data = `[ERROR] ${new Date().toLocaleString()} - ${message}\n`
    switch (this.mode) {
      case 'console':
        {
          stdout.write(data);
        }
        break;
      case 'file':
        {
          this.writer.write(data);
          this.writer.writeError(data);
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
    const data = ` [WARN] ${new Date().toLocaleString()} - ${message}\n`
    switch (this.mode) {
      case 'console':
        {
          stdout.write(data);
        }
        break;
      case 'file':
        {
          this.writer.write(data);
        }
        break;
      default:
        return;
    }
  }

  debug(message: string) {
    if (this.level.length < 4) {
      return;
    }
    const data = ` [DEBUG] ${new Date().toLocaleString()} - ${message}\n`
    switch (this.mode) {
      case 'console':
        {
          stdout.write(data);
        }
        break;
      case 'file':
        {
          this.writer.write(data);
        }
        break;
      default:
        return;
    }
  }

  verbose(message: string) {
    if (this.level.length < 5) {
      return;
    }
    const data = `[VERBOSE] ${new Date().toLocaleString()} - ${message}\n`
    switch (this.mode) {
      case 'console':
        {
          stdout.write(data);
        }
        break;
      case 'file':
        {
          this.writer.write(data);
        }
        break;
      default:
        return;
    }
  }


}
