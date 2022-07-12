import { Injectable,  } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { IUser } from "./interfaces";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserPasswordDto } from "./dto/update-user.dto";
import { ServiceResponses } from "src/constants/constants";

@Injectable()
export class UsersService {
  
  private readonly users = [];

  getAll(): IUser[] {
    return this.users;
  };

  get(id: string): IUser {
    return this.users.find(user => user.id === id);
  };

  add(data: CreateUserDto): IUser  {
    const { login, password } = data;
    const newUser = {
      login,
      password,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: 0
    };
    this.users.push(newUser);
    return newUser;
  };

  updatePassword(data: UpdateUserPasswordDto, id: string) {
    const { oldPassword, newPassword } = data;
    const user = this.users.find(user => user.id === id);
    if (user && user.password === oldPassword) {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
      return user;
    }
    if (user && user.password !== oldPassword) {
      return ServiceResponses.WRONG_PASSWORD;
    }
    return user;
  };

  delete(id: string) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) { return; }
    this.users.splice(index, 1);
    return true;
  };

}