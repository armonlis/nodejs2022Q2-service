import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { AppDataSource } from 'src/typeorm/data-source';
import { Track } from 'src/typeorm/entity/tracks';

@Injectable()
export class TracksService {
  private readonly tracksRepository = AppDataSource.getRepository(Track);

  async add(data: CreateTrackDto) {
    const track = { ...new Track(), ...data };
    await this.tracksRepository.save(track);
    return track;
  }

  async getAll() {
    const result = await this.tracksRepository.find();
    return result;
  }

  async get(id: string) {
    const result = await this.tracksRepository.findOneBy({ id });
    return result;
  }

  async update(data: UpdateTrackDto, id: string) {
    let track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      return;
    }
    track = { ...track, ...data };
    await this.tracksRepository.save(track);
    return track;
  }

  async delete(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      return;
    }
    await this.tracksRepository.remove(track);
    return true;
  }
}
