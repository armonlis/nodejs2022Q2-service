import { Injectable } from "@nestjs/common";
import { SignupDTO } from "./dto/signup.dto";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "src/typeorm/data-source";
import { User } from "src/typeorm/entity/users";

const saltRound = 10;

@Injectable()
export class AuthService {

  private readonly usersStorage = AppDataSource.getRepository(User);  

  async signup(data: SignupDTO) {
    const { login, password } = data;
    const hash = await bcrypt.hash(password, saltRound)
    await this.usersStorage.save({ login, password: hash })
    return;
  };   

};