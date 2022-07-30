import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
