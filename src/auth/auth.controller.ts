import { Controller, Post, Body } from "@nestjs/common";
import { SignupDTO } from "./dto/signup.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {

  constructor(private readonly authService: AuthService) {};
  
  @Post("signup")  
  async signup(@Body() signupDto: SignupDTO) {
    this.authService.signup(signupDto);
    return;  
  };  

}