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
  UseGuards,
  Response,
  Request,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { logger } from 'src/main';
import { LogService } from 'src/logging/log.service';

@Controller('album')
export class AlbumsController {
  private readonly logService: LogService;
  constructor(private readonly albums: AlbumsService) {
    this.logService = logger;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.albums.add(createAlbumDto);
    if (!result) {
      throw new UnprocessableEntityException('A such artist does not exist.');
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.albums.update(updateAlbumDto, id);
    if (!result) {
      throw new NotFoundException(`The album with id=${id} is not exist.`);
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.albums.delete(id);
    if (!result) {
      throw new NotFoundException(`The album with id=${id} is not exist.`);
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllAlbums(@Request() { url, method, body }, @Response() res: any) {
    const result = await this.albums.getAll();

    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );

    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAlbumById(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.albums.get(id);
    if (!result) {
      throw new NotFoundException(`The album with id=${id} is not exist.`);
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }
}
