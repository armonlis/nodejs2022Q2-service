import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ITrack } from './interfaces';
import { AlbumsService } from 'src/album/albums.service';
import { ArtistsService } from 'src/artist/artist.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavouritesService } from 'src/favourites/favourites.service';

@Injectable()
export class TracksService {
  private readonly tracks: ITrack[] = [];

  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artists: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albums: AlbumsService,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favourites: FavouritesService,
  ) {}

  add(data: CreateTrackDto) {
    const { albumId, artistId } = data;
    if (albumId) {
      if (!this.checkId(albumId, "album")) { return }
    }
    if (artistId) {
      if (!this.checkId(artistId)) { return }
    }
    const track = {
      id: uuid(),
      ...data,
      albumId: albumId ?? null,
      artistId: artistId ?? null,
    };
    this.tracks.push(track);
    return track;
  }

  getAll() {
    return this.tracks;
  }

  get(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  update(data: UpdateTrackDto, id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      return;
    }
    this.tracks[index] = { ...this.tracks[index], ...data };
    return this.tracks[index];
  }

  delete(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      return;
    }
    this.favourites.deleteTrack(id);
    this.tracks.splice(index, 1);
    return true;
  }

  setToNull(id: string, property: 'album' | 'artist' = 'artist') {
    let index: number;
    while (index !== -1) {
      index = this.tracks.findIndex((track) => track[`${property}Id`] === id);
      if (index !== -1) {
        this.tracks[index][`${property}Id`] = null;
      }
    }
  }

  checkId(id: string, mode: "artist" | "album" = "artist") {
    return this[`${mode}s`].get(id);
  }
}
