import {
  Controller,
  Post,
  Get,
  Delete,
  UnprocessableEntityException,
  Param,
  ParseUUIDPipe,
  HttpCode,
  UseGuards
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favourites: FavouritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('artist/:id')
  async createFavouritesArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.addArtist(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  async deleteFavouritesArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.deleteArtist(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('album/:id')
  async createFavouritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.addAlbum(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('album/:id')
  @HttpCode(204)
  async deleteFavouritesAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.deleteAlbum(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('track/:id')
  async createFavouritesTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.addTrack(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('track/:id')
  @HttpCode(204)
  async deleteFavouritesTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favourites.deleteTrack(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFavourites() {
    const result = await this.favourites.get();
    return result;
  }
}
