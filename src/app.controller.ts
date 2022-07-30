import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { stdout } from 'process';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('do_me_an_IE')
  doInternalError() {
    throw new InternalServerErrorException('A server error occured!');
  }

  @Get('do_me_an_error')
  doError() {
    throw new Error('An error accured!');
  }

  @Get('do_me_an_error_again')
  doErrorAgain() {
    let a: any;
    if (a.b) {
      stdout.write("IT IS A WONDER!!!");
    }
  }
}
