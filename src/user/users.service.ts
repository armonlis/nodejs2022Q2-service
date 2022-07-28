import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user.dto';
import { ServiceResponses } from 'src/constants/constants';
import { User } from 'src/typeorm/entity/users';
import { AppDataSource } from 'src/typeorm/data-source';

@Injectable()
export class UsersService {
  private readonly users = AppDataSource.getRepository(User);

  async getAll() {
    const users = await this.users.find();
    const returnedUsers = users.map((user) => {
      const { login, id, createdAt, updatedAt, version } = user;
      return { login, id, createdAt, updatedAt, version };
    });
    return returnedUsers;
  }

  async get(indificator: string) {
    const user = await this.users.findOneBy({ id: indificator });
    if (!user) {
      return;
    }
    const { login, id, createdAt, updatedAt, version } = user;
    return { login, id, createdAt, updatedAt, version };
  }

  async add(data: CreateUserDto) {
    const user = { ...new User(), ...data };
    await this.users.save(user);
    const { login, id, createdAt, updatedAt, version } = user;
    return {
      login,
      id,
      createdAt: Date.parse(createdAt),
      updatedAt: Date.parse(updatedAt),
      version,
      jwt: null
    };
  }

  async updatePassword(data: UpdateUserPasswordDto, indificator: string) {
    const { oldPassword, newPassword } = data;
    const user = await this.users.findOneBy({ id: indificator });
    if (!user) {
      return;
    }
    if (user && user.password !== oldPassword) {
      return ServiceResponses.WRONG_PASSWORD;
    }
    user.password = newPassword;
    await this.users.save(user);
    const { login, id, createdAt, version } = user;
    const updatedAt =
      Date.parse(createdAt) === Date.parse(user.updatedAt)
        ? Date.parse(createdAt) + 999
        : Date.parse(user.updatedAt);
    return { login, id, createdAt: Date.parse(createdAt), updatedAt, version };
  }

  async delete(id: string) {
    const user = await this.users.findOneBy({ id });
    if (!user) {
      return;
    }
    await this.users.remove(user);
    return true;
  }
}
