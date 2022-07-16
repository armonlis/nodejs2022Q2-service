import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class ChangeArtistDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  grammy?: boolean;
}
