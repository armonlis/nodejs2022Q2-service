import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { IAddedAlbum, IAlbum, IUpdatedAlbum } from './interfaces';
import { FavouritesService } from 'src/favourites/favourites.service';
import { TracksService } from 'src/track/tracks.service';
import { ArtistsService } from 'src/artist/artist.service';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => FavouritesService))
    private readonly favourites: FavouritesService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracks: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artists: ArtistsService,
  ) {}

  private readonly albums: IAlbum[] = [];

  add(body: IAddedAlbum): IAlbum {
    const { name, year, artistId } = body;
    if (artistId) {
      const artist = this.artists.getById(artistId);
      if (!artist) { return }
    }
    const album = {
      id: uuid(),
      name,
      year,
      artistId: artistId ?? null,
    };
    this.albums.push(album);
    return album;
  }

  update(body: IUpdatedAlbum, id: string): IAlbum {
    let album = this.albums.find((album) => album.id === id);
    if (!album) {
      return;
    }
    album = { ...album, ...body };
    return album;
  }

  delete(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      return undefined;
    }
    this.favourites.deleteAlbum(id);
    this.tracks.setToNull(id, 'album');
    this.albums.splice(index, 1);
    return true;
  }

  getAll() {
    return this.albums;
  }

  get(id: string) {
    return this.albums.find((album) => album.id === id);
  }
}
