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
    return `The artist ${result.name} was added to favourites.`;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteFavouritesArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favourites.deleteArtist(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @Post('album/:id')
  async createFavouritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.addAlbum(id);
    if (!result) {
      throw new UnprocessableEntityException('A such album does not exist.');
    }
    return `The album ${result.name} was added to favourites.`;
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteFavouritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favourites.deleteAlbum(id);
    if (!result) {
      throw new UnprocessableEntityException('A such album does not exist.');
    }
    return;
  }

  @Post('track/:id')
  async createFavouritesTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.addTrack(id);
    if (!result) {
      throw new UnprocessableEntityException('A such track does not exist.');
    }
    return `The tack ${result.name} was added to favourites.`;
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteFavouritesTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favourites.deleteTrack(id);
    if (!result) {
      throw new UnprocessableEntityException('A such track does not exist.');
    }
    return;
  }

  @Get()
  async getFavourites() {
    const result = await this.favourites.get();
    return result; 
  }
}
