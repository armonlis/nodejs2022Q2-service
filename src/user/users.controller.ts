import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  Post,
  Body,
  Put,
  ForbiddenException,
  Delete,
  HttpCode,
  UseGuards,
  Response,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user.dto';
import { ServiceResponses } from 'src/constants/constants';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { logger } from 'src/main';
import { LogService } from 'src/logging/log.service';

@Controller('user')
export class UsersController {
  private readonly logService: LogService;
  constructor(private users: UsersService) {
    this.logService = logger;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Request() { url, method, body }, @Response() res: any) {
    const result = await this.users.getAll();
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const user = await this.users.get(id);
    if (!user) {
      throw new NotFoundException('User with a such id was not found.');
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addUser(
    @Body() createUserDto: CreateUserDto,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.users.add(createUserDto);
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async changeUserPassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.users.updatePassword(updateUserPasswordDto, id);
    if (!result) {
      throw new NotFoundException('User with a such id was not found.');
    }
    if (result === ServiceResponses.WRONG_PASSWORD) {
      throw new ForbiddenException('Wrong password. Access denied.');
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.users.delete(id);
    if (!result) {
      throw new NotFoundException('User with a such id was not found.');
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }
}
