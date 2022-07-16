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
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracks: TracksService) {}

  @Post()
  addTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.tracks.add(createTrackDto);
  }

  @Get()
  getAllTracks() {
    return this.tracks.getAll();
  }

  @Get(':id')
  getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.tracks.get(id);
    if (!result) {
      throw new NotFoundException(`The track with id=${id} is not exist.`);
    }
    return result;
  }

  @Put(':id')
  updateTrack(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const result = this.tracks.update(updateTrackDto, id);
    if (!result) {
      throw new NotFoundException(`The track with id=${id} is not exist.`);
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.tracks.delete(id);
    if (!result) {
      throw new NotFoundException(`The track with id=${id} is not exist.`);
    }
    return;
  }
}
