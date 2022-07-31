import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  ParseUUIDPipe,
  Param,
  Put,
  Delete,
  HttpCode,
  UnprocessableEntityException,
  UseGuards,
  Response,
  Request,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { logger } from 'src/main';
import { LogService } from 'src/logging/log.service';

@Controller('track')
export class TracksController {
  private readonly logService: LogService;
  constructor(private readonly tracks: TracksService) {
    this.logService = logger;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addTrack(
    @Body() createTrackDto: CreateTrackDto,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.tracks.add(createTrackDto);
    if (!result) {
      throw new UnprocessableEntityException(
        'A such artist or album does not exist.',
      );
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTracks(@Request() { url, method, body }, @Response() res: any) {
    const result = await this.tracks.getAll();
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTrackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.tracks.get(id);
    if (!result) {
      throw new NotFoundException(`The track with id=${id} is not exist.`);
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
  async updateTrack(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.tracks.update(updateTrackDto, id);
    if (!result) {
      throw new NotFoundException(`The track with id=${id} is not exist.`);
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
  async deleteTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() { url, method, body },
    @Response() res: any,
  ) {
    const result = await this.tracks.delete(id);
    if (!result) {
      throw new NotFoundException(`The track with id=${id} is not exist.`);
    }
    await this.logService.log(
      `[REQUEST] ${method} ${url} ${JSON.stringify(body)} ---> [RESPONSE] ${
        res.statusCode
      }`,
    );
    res.send();
  }
}
