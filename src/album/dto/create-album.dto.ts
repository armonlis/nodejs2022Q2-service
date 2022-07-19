import { IsNotEmpty, IsString, IsInt, IsOptional, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
