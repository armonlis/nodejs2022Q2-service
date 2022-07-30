import {
  Controller,
  Post,
  Get,
  Delete,
  UnprocessableEntityException,
  Param,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
  Response,
  Request,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { logger } from 'src/main';
import { LogService } from 'src/logging/log.service';

@Controller('favs')
export class FavouritesController {
  private readonly logService: LogService;
  constructor(private readonly favourites: FavouritesService) {
    this.logService = logger;
  }

  @UseGuards(JwtAuthGuard)
  @Post('artist/:id')
  async createFavouritesArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.favourites.addArtist(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  async deleteFavouritesArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.favourites.deleteArtist(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }

  @UseGuards(JwtAuthGuard)
  @Post('album/:id')
  async createFavouritesAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.favourites.addAlbum(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('album/:id')
  @HttpCode(204)
  async deleteFavouritesAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.favourites.deleteAlbum(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }

  @UseGuards(JwtAuthGuard)
  @Post('track/:id')
  async createFavouritesTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.favourites.addTrack(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('track/:id')
  @HttpCode(204)
  async deleteFavouritesTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.favourites.deleteTrack(id);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getFavourites(@Request() { url, method, body }, @Response() res: any) {
    const result = await this.favourites.get();
    this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }
}
