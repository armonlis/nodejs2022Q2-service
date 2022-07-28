import { Injectable } from "@nestjs/common";
import { SignupDTO } from "./dto/signup.dto";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "src/typeorm/data-source";
import { User } from "src/typeorm/entity/users";
import { IUser } from "src/constants/interfaces";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dto/login.dto";

const saltRound = +process.env.SALTROUND;


@Injectable()
export class AuthService {

  private readonly usersStorage = AppDataSource.getRepository(User); 
  
  constructor(private readonly jwtService: JwtService) {};

  async signup(data: SignupDTO) {
    const { login, password } = data;
    const hash = await bcrypt.hash(password, saltRound)
    await this.usersStorage.save({ login, password: hash });
    return;
  };
  
  async validateUser(data: IUser) {
    const { login } = data;
    const user = await this.usersStorage.findOneBy({ login });
    if (user) {
      const {password, ...result} = user;
      const isPasswordReal = await bcrypt.compare(data.password, user.password);
      return isPasswordReal ? result : null; 
    }
    return null;
  };

  async login(data: LoginDTO) {
    const user = await this.validateUser(data);
    if (!user) { return }
    const { login, id } = user;
    const payload = { username: login, sub: id };
    const jwt = this.jwtService.sign(payload);
    await this.usersStorage.save(user);
    return { token: jwt };
  };
 
};