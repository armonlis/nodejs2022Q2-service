import { FileHandle, open, readdir, mkdir } from 'fs/promises';
import * as dotenv from 'dotenv';

dotenv.config();

const LOGS_FILE_NAME = process.env.LOG_FILE_NAME;
const PATH = process.env.PATH_TO_LOGS;
const LOGS_MAX_SIZE = process.env.LOGS_MAX_SIZE;
const ERRORS_FILE_NAME = process.env.ERROR_FILE_NAME;
const ERRORS_MAX_SIZE = process.env.ERRORS_MAX_SIZE;

export class FileWriter {
  private readonly logsName: string;
  private logsCounter: number;
  private logs: FileHandle | null;
  private readonly logsMaxSize: number;
  private logsSize: number;
  private readonly errorsName: string;
  private errorsCounter: number;
  private errors: FileHandle | null;
  private readonly errorsMaxSize: number;
  private errorsSize: number;

  constructor() {
    this.logsName = LOGS_FILE_NAME;
    this.logsCounter = 0;
    this.logs = null;
    this.logsSize = 0;
    this.logsMaxSize = +LOGS_MAX_SIZE * 1024;
    this.errorsName = ERRORS_FILE_NAME;
    this.errorsCounter = 0;
    this.errors = null;
    this.errorsSize = 0;
    this.errorsMaxSize = +ERRORS_MAX_SIZE * 1024;
  }

  async initializing() {
    try {
      const files = await readdir(PATH);
      const logs = files.filter((name) => name.startsWith('logs'));
      this.logsCounter += logs.length;
      this.logs = await open(
        `${PATH}${this.logsName}${this.logsCounter}.txt`,
        'w+',
      );
      const errors = files.filter((name) => name.startsWith('errors'));
      this.errorsCounter += errors.length;
      this.errors = await open(
        `${PATH}${this.errorsName}${this.errorsCounter}.txt`,
        'w+',
      );
    } catch {
      await mkdir(PATH);
      this.logs = await open(
        `${PATH}${this.logsName}${this.logsCounter}.txt`,
        'w+',
      );
      this.errors = await open(
        `${PATH}${this.errorsName}${this.errorsCounter}.txt`,
        'w+',
      );
    }
  }

  async write(data: string) {
    if (this.logsSize + data.length > this.logsMaxSize) {
      this.logsCounter += 1;
      this.logsSize = 0;
      //this.logs.close();
      this.logs = await open(
        `${PATH}${this.logsName}${this.logsCounter}.txt`,
        'w+',
      );
    }
    this.logsSize += data.length;
    await this.logs.appendFile(data);
  }

  async writeError(data: string) {
    if (this.errorsSize + data.length > this.errorsMaxSize) {
      this.errorsCounter += 1;
      this.errorsSize = 0;
      //this.errors.close();
      this.errors = await open(
        `${PATH}${this.errorsName}${this.errorsCounter}.txt`,
        'w+',
      );
    }
    this.errorsSize += data.length;
    await this.errors.appendFile(data);
  }
}
