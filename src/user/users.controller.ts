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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user.dto';
import { ServiceResponses } from 'src/constants/constants';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    const result = await this.users.getAll();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.users.get(id);
    if (!user) {
      throw new NotFoundException('User with a such id was not found.');
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.users.add(createUserDto);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async changeUserPassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const result = await this.users.updatePassword(updateUserPasswordDto, id);
    if (!result) {
      throw new NotFoundException('User with a such id was not found.');
    }
    if (result === ServiceResponses.WRONG_PASSWORD) {
      throw new ForbiddenException('Wrong password. Access denied.');
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.users.delete(id);
    if (!result) {
      throw new NotFoundException('User with a such id was not found.');
    }
    return;
  }
}
