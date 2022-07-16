import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsOptional()
  artistId?: string | null;

  @IsString()
  @IsOptional()
  albumId?: string | null;
}
