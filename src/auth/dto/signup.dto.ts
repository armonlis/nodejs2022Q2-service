import { IsString, IsNotEmpty } from "class-validator";

export class SignupDTO {

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

};