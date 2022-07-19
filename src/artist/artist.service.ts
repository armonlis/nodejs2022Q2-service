import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { IArtist } from './interfaces';
import { CreateArtistDTO } from './DTO/create-artist.dto';
import { ChangeArtistDTO } from './DTO/change-artist.dto';
import { FavouritesService } from 'src/favourites/favourites.service';
import { TracksService } from 'src/track/tracks.service';
import { Artist } from 'src/typeorm/entity/artists';
import { AppDataSource } from 'src/typeorm/data-source';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => FavouritesService))
    private readonly favourites: FavouritesService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracks: TracksService,
  ) {}

  private readonly artistsStorage = AppDataSource.getRepository(Artist);

  async getAll() {
    const result = await this.artistsStorage.find();
    return result;
  }

  async get(id: string) {
    const artist = await this.artistsStorage.findOneBy({ id });
    if (!artist) {
      return;
    }
    return artist;
  }

  async create(data: CreateArtistDTO) {
    const artist = { ...new Artist(), ...data };
    await this.artistsStorage.save(artist);
    return artist;
  }

  async change(data: ChangeArtistDTO, id: string) {
    let artist = await this.artistsStorage.findOneBy({ id });
    if (!artist) {
      return;
    }
    artist = { ...artist, ...data };
    await this.artistsStorage.save(artist);
    return artist;
  }

  async delete(id: string) {
    const artist = await this.artistsStorage.findOneBy({ id })
    if (!artist) {
      return;
    }
    await this.artistsStorage.remove(artist);
    this.tracks.setToNull(id);
    return true;
  }
}
