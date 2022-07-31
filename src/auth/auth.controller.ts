import {
  Controller,
  Post,
  Body,
  ForbiddenException,
  UnauthorizedException,
  Response,
  Request,
} from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { logger } from 'src/main';
import { LogService } from 'src/logging/log.service';

@Controller('auth')
export class AuthController {
  private readonly logService: LogService;

  constructor(private readonly authService: AuthService) {
    this.logService = logger;
  }

  @Post('signup')
  async signup(
    @Body() signupDto: SignupDTO,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    await this.authService.signup(signupDto);
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDTO,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.authService.login(loginDto);
    if (!result) {
      throw new ForbiddenException();
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @Post('refresh')
  async refreshKey(
    @Body() data: Record<string, string>,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    if (!data.refreshToken) {
      throw new UnauthorizedException('There is no refresh key.');
    }
    const result = await this.authService.refresh(body.refreshToken);
    if (!result) {
      throw new ForbiddenException('Refresh token is invalid or expired.');
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }
}
