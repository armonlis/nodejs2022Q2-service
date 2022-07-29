import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogService } from './log.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logService: LogService;
  constructor() {
    this.logService = new LogService();
  };

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const { message, error, ..._ } = exception.getResponse() as {statusCode: number, message: string, error: string};
    
    this.logService.log(`[REQUEST] ${req.method} ${req.url} ${JSON.stringify(req.body)} ---> [RESPONSE] ${exception.getStatus()} (${error}) ${message ?? ""}`);
    
    res.json(exception.getResponse());
  }
}