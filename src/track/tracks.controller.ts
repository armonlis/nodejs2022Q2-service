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
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('track')
export class TracksController {
  constructor(private readonly tracks: TracksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addTrack(@Body() createTrackDto: CreateTrackDto) {
    const result = await this.tracks.add(createTrackDto);
    if (!result) {
      throw new UnprocessableEntityException(
        'A such artist or album does not exist.',
      );
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTracks() {
    const result = this.tracks.getAll();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.tracks.get(id);
    if (!result) {
      throw new NotFoundException(`The track with id=${id} is not exist.`);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTrack(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const result = await this.tracks.update(updateTrackDto, id);
    if (!result) {
      throw new NotFoundException(`The track with id=${id} is not exist.`);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.tracks.delete(id);
    if (!result) {
      throw new NotFoundException(`The track with id=${id} is not exist.`);
    }
    return;
  }
}
