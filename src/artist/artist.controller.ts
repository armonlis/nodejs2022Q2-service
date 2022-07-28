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
  UseGuards
} from '@nestjs/common';
import { ArtistsService } from './artist.service';
import { CreateArtistDTO } from './DTO/create-artist.dto';
import { ChangeArtistDTO } from './DTO/change-artist.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('artist')
export class ArtistsController {
  constructor(private artists: ArtistsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    const result = await this.artists.getAll();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.artists.get(id);
    if (!result) {
      throw new NotFoundException(`The artist with id=${id} is not exist.`);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateArtistDTO) {
    const result = await this.artists.create(data);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async change(
    @Body() data: ChangeArtistDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const result = await this.artists.change(data, id);
    if (!result) {
      throw new NotFoundException(`The artist with id={id} is not exist.`);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.artists.delete(id);
    if (!result) {
      throw new NotFoundException(`The artist with id=${id} is not exist.`);
    }
  }
}
