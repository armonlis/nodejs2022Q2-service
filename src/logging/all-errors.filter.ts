import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LogService } from './log.service';
import { logger } from 'src/main';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllErrorsExceptionFilter implements ExceptionFilter {
  private readonly logService: LogService;

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.logService = logger;
  }

  catch(exception: { name: string } | unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (
      exception instanceof InternalServerErrorException ||
      exception instanceof HttpException
    ) {
      const res = ctx.getResponse<Response>();
      const req = ctx.getRequest<Request>();
      const { message, error, ..._ } = exception.getResponse() as {
        statusCode: number;
        message: string;
        error: string;
      };
      exception.getStatus() !== 500
        ? this.logService.log(
            `[REQUEST] ${req.method} ${req.url} ${JSON.stringify(
              req.body,
            )} ---> [RESPONSE] ${exception.getStatus()} (${error}) ${
              message ?? ''
            }`,
          )
        : this.logService.error(
            `[REQUEST] ${req.method} ${req.url} ${JSON.stringify(
              req.body,
            )} ---> [RESPONSE] ${exception.getStatus()} (${error}) ${
              message ?? ''
            }`,
          );
      res.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    if (exception instanceof Error) {
      const req = ctx.getRequest();
      const resBody = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message ?? 'No message.',
        error: exception.name ?? 'Unknown error.',
      };
      this.logService.error(
        `[REQUEST] ${req.method} ${req.url} ${JSON.stringify(
          req.body,
        )} ---> [ERROR] ${resBody.message} ${resBody.error}`,
      );
      httpAdapter.reply(
        ctx.getResponse(),
        resBody,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return;
    }
  }
}
