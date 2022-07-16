import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
