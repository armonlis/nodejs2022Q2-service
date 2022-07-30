import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LogService } from './log.service';
import { logger } from 'src/main';

@Catch(InternalServerErrorException)
export class InternallErrorExceptionFilter implements ExceptionFilter {
  private readonly logService: LogService;
  constructor() {
    this.logService = logger;
  }

  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const { message, error, ..._ } = exception.getResponse() as {
      statusCode: number;
      message: string;
      error: string;
    };

    this.logService.error(
      `[REQUEST] ${req.method} ${req.url} ${JSON.stringify(
        req.body,
      )} ---> [RESPONSE] ${exception.getStatus()} (${error}) ${message ?? ''}`,
    );
    res.json(exception.getResponse());
  }
}
