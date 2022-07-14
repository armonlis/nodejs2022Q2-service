import { IsString, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateArtistDTO {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
  
};