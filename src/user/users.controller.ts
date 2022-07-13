import { Controller, Get, Param, ParseUUIDPipe, NotFoundException, Post, Body, Put, ForbiddenException, Delete, HttpCode, } from "@nestjs/common";
import { UsersService } from "./users.service";
import { IUser } from "./interfaces";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserPasswordDto } from "./dto/update-user.dto";
import { ServiceResponses } from "src/constants/constants";

@Controller("user")
export class UsersController {

  constructor(private users: UsersService) {};

  @Get() 
  getAllUsers() {
    return this.users.getAll()
  };

  @Get(":id")
  getUserById(@Param("id", ParseUUIDPipe) id: string) {
    const user = this.users.get(id);
    if (!user) { throw new NotFoundException("User with a such id was not found.") }
    return user;
  };

  @Post()
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.users.add(createUserDto);
  };

  @Put(":id")
  changeUserPassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto, @Param("id", ParseUUIDPipe) id: string) {
    const result = this.users.updatePassword(updateUserPasswordDto, id);
    if (!result) { throw new NotFoundException("User with a such id was not found.") }
    if (result === ServiceResponses.WRONG_PASSWORD) { throw new ForbiddenException("Wrong password. Access denied.") }
    return result;
  };

  @Delete(":id")
  @HttpCode(204)
  deleteUser(@Param("id", ParseUUIDPipe) id: string) {
    const result = this.users.delete(id);
    if (!result) { throw new NotFoundException("User with a such id was not found.") }
    return;
  }
}