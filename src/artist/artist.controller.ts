import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artist.service';
import { IArtist } from './interfaces';
import { CreateArtistDTO } from './DTO/create-artist.dto';
import { ChangeArtistDTO } from './DTO/change-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artists: ArtistsService) {}

  @Get()
  getAll(): IArtist[] {
    return this.artists.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.artists.get(id);
    if (!result) {
      throw new NotFoundException(`The artist with id=${id} is not exist.`);
    }
    return result;
  }

  @Post()
  create(@Body() data: CreateArtistDTO) {
    return this.artists.create(data);
  }

  @Put(':id')
  change(
    @Body() data: ChangeArtistDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const result = this.artists.change(data, id);
    if (!result) {
      throw new NotFoundException(`The artist with id={id} is not exist.`);
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.artists.delete(id);
    if (!result) {
      throw new NotFoundException(`The artist with id=${id} is not exist.`);
    }
  }
}
