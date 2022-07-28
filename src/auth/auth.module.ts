import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

const SECRET_KEY = process.env.JWT_CONST;
const USE_BEFORE = process.env.EXP;

@Module({
  imports: [PassportModule, JwtModule.register({ secret: SECRET_KEY, signOptions: {expiresIn: `${USE_BEFORE}s`}})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {};