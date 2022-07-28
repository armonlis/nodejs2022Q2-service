import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

const SECRET_KEY = process.env.JWT_CONST;
const USE_BEFORE = process.env.EXP;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_CONST;
const REFRESH_EXP = process.env.REFRESH_EXP;

@Module({
  imports: [PassportModule, 
    JwtModule.register({}), 
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {};