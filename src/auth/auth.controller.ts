import { Controller, Post, Body, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { SignupDTO } from "./dto/signup.dto";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";

@Controller("auth")
export class AuthController {

  constructor(private readonly authService: AuthService) {};
  
  @Post("signup")  
  async signup(@Body() signupDto: SignupDTO) {
    this.authService.signup(signupDto);
    return;  
  }; 
  
  @Post("login")
  async login(@Body() loginDto: LoginDTO) {
    const result = await this.authService.login(loginDto);
    if (!result) { throw new ForbiddenException() }
    return result;
  }

  @Post("refresh")
  async refreshKey(@Body() body: Record<string, string>) {
    if (!body.refreshToken) { throw new UnauthorizedException("There is no refresh key.") }
    const result = await this.authService.refresh(body.refreshToken);
    if (!result) { throw new ForbiddenException("Refresh token is invalid or expired.") }
    return result;
  }

}