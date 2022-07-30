import { Injectable } from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from 'src/typeorm/data-source';
import { User } from 'src/typeorm/entity/users';
import { IUser } from 'src/constants/interfaces';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { JwtPayload } from 'jsonwebtoken';

const SALTROUND = +process.env.SALTROUND;
const SECRET_KEY = process.env.JWT_CONST;
const USE_BEFORE = process.env.EXP;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_CONST;
const REFRESH_EXP = process.env.REFRESH_EXP;

@Injectable()
export class AuthService {
  private readonly usersStorage = AppDataSource.getRepository(User);

  constructor(private readonly jwtService: JwtService) {}

  async signup(data: SignupDTO) {
    const { login, password } = data;
    const hash = await bcrypt.hash(password, SALTROUND);
    await this.usersStorage.save({ login, password: hash });
    return;
  }

  async validateUser(data: IUser) {
    const { login } = data;
    const user = await this.usersStorage.findOneBy({ login });
    if (user) {
      const { password, ...result } = user;
      const isPasswordReal = await bcrypt.compare(data.password, user.password);
      return isPasswordReal ? result : null;
    }
    return null;
  }

  async login(data: LoginDTO) {
    const user = await this.validateUser(data);
    if (!user) {
      return;
    }
    const { login, id } = user;
    const payload = { login, id };
    const jwt = this.jwtService.sign(payload, {
      secret: SECRET_KEY,
      expiresIn: USE_BEFORE,
    });
    const refresh_jwt = this.jwtService.sign(payload, {
      secret: REFRESH_SECRET_KEY,
      expiresIn: REFRESH_EXP,
    });
    user.refresh_token = await bcrypt.hash(refresh_jwt, SALTROUND);
    await this.usersStorage.save(user);
    return {
      accessToken: jwt,
      access_exp: USE_BEFORE,
      refreshToken: refresh_jwt,
      refresh_exp: REFRESH_EXP,
    };
  }

  async refresh(key: string) {
    const data = this.jwtService.decode(key) as JwtPayload;
    if (!data || data.exp * 1000 < Date.now() || !data.id) {
      return;
    }
    const user = await this.usersStorage.findOneBy({ id: data.id });
    if (!user || user.login !== data.login) {
      return;
    }
    const isTheSameKey = await bcrypt.compare(key, user.refresh_token);
    if (!isTheSameKey) {
      return;
    }
    const payload = { login: user.login, id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: SECRET_KEY,
      expiresIn: USE_BEFORE,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: REFRESH_SECRET_KEY,
      expiresIn: REFRESH_EXP,
    });
    user.refresh_token = await bcrypt.hash(refreshToken, SALTROUND);
    await this.usersStorage.save(user);
    return {
      accessToken,
      access_exp: USE_BEFORE,
      refreshToken,
      refresh_exp: REFRESH_EXP,
    };
  }
}
