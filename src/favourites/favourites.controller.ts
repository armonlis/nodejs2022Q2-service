import {
  Controller,
  Post,
  Get,
  Delete,
  UnprocessableEntityException,
  Param,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favourites: FavouritesService) {}

  @Post('artist/:id')
  async createFavouritesArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.addArtist(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteFavouritesArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.deleteArtist(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @Post('album/:id')
  async createFavouritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.addAlbum(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteFavouritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.deleteAlbum(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @Post('track/:id')
  async createFavouritesTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.addTrack(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteFavouritesTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.deleteTrack(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @Get()
  async getFavourites() {
    const result = await this.favourites.get();
    return result;
  }
}
