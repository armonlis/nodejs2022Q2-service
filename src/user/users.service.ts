import { Injectable,  } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserPasswordDto } from "./dto/update-user.dto";
import { ServiceResponses } from "src/constants/constants";

@Injectable()
export class UsersService {
  
  private readonly users = [];

  getAll() {
    const users = this.users.map(user => {
      const { login, id, createdAt, updatedAt, version } = user; 
      return { login, id, createdAt, updatedAt, version }; 
    });
    return users;
  };

  get(indificator: string) {
    const user = this.users.find(user => user.id === indificator);
    if (!user) { return; }
    const { login, id, createdAt, updatedAt, version } = user; 
    return { login, id, createdAt, updatedAt, version }; 
  };

  add(data: CreateUserDto) {
    const { login, password } = data;
    const time = Date.now();
    const newUser = {
      login,
      password,
      id: uuid(),
      version: 1,
      createdAt: time,
      updatedAt: time
    };
    this.users.push(newUser);
    const { id, createdAt, updatedAt, version } = newUser; 
    return { login, id, createdAt, updatedAt, version };
    
  };

  updatePassword(data: UpdateUserPasswordDto, indificator: string) {
    const { oldPassword, newPassword } = data;
    const user = this.users.find(user => user.id === indificator);
    if (user && user.password === oldPassword) {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
      const { login, id, createdAt, updatedAt, version } = user; 
      return { login, id, createdAt, updatedAt, version }; 
    }
    if (user && user.password !== oldPassword) {
      return ServiceResponses.WRONG_PASSWORD;
    }
    return;
  };

  delete(id: string) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) { return; }
    this.users.splice(index, 1);
    return true;
  };

}