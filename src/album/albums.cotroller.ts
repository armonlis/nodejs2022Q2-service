import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  Delete,
  HttpCode,
  Get,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albums: AlbumsService) {}

  @Post()
  async addAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    const result = await this.albums.add(createAlbumDto);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return result;
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const result = await this.albums.update(updateAlbumDto, id);
    if (!result) {
      throw new NotFoundException(`The album with id=${id} is not exist.`);
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.albums.delete(id);
    if (!result) {
      throw new NotFoundException(`The album with id=${id} is not exist.`);
    }
    return;
  }

  @Get()
  getAllAlbums() {
    return this.albums.getAll();
  }

  @Get(':id')
  async getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.albums.get(id);
    if (!result) {
      throw new NotFoundException(`The album with id=${id} is not exist.`);
    }
    return result;
  }
}
