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
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { ArtistsService } from './artist.service';
import { CreateArtistDTO } from './DTO/create-artist.dto';
import { ChangeArtistDTO } from './DTO/change-artist.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { logger } from 'src/main';
import { LogService } from 'src/logging/log.service';

@Controller('artist')
export class ArtistsController {
  private readonly logService: LogService;

  constructor(private artists: ArtistsService) {
    this.logService = logger;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() { url, method, body }, @Response() res: any) {
    const result = await this.artists.getAll();
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.artists.get(id);
    if (!result) {
      throw new NotFoundException(`The artist with id=${id} is not exist.`);
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() data: CreateArtistDTO,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.artists.create(data);
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async change(
    @Body() data: ChangeArtistDTO,
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.artists.change(data, id);
    if (!result) {
      throw new NotFoundException(`The artist with id={id} is not exist.`);
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
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.artists.delete(id);
    if (!result) {
      throw new NotFoundException(`The artist with id=${id} is not exist.`);
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }
}
