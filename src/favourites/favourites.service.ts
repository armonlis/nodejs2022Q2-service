import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/typeorm/data-source';
import { Favorites } from 'src/typeorm/entity/favourites';
import { Artist } from 'src/typeorm/entity/artists';
import { Album } from 'src/typeorm/entity/albums';
import { Track } from 'src/typeorm/entity/tracks';

@Injectable()
export class FavouritesService {
  userId: number;

  constructor() {
    this.userId = 1;
    this.favouritesStorage.save({ ...new Favorites(), userId: this.userId });
  }

  private readonly favouritesStorage = AppDataSource.getRepository(Favorites);
  private readonly artistsStorage = AppDataSource.getRepository(Artist);
  private readonly albumsStorage = AppDataSource.getRepository(Album);
  private readonly tracksStorage = AppDataSource.getRepository(Track);

  async get() {
    const result = await this.favouritesStorage.findOneBy({
      userId: this.userId,
    });
    return result;
  }

  async addArtist(id: string) {
    const favourites = await this.favouritesStorage.findOneBy({
      userId: this.userId,
    });
    const artist = await this.artistsStorage.findOneBy({ id });
    if (!artist) {
      return;
    }
    favourites.artists.push(artist);
    await this.favouritesStorage.save(favourites);
    return true;
  }

  async deleteArtist(id: string) {
    const favourites = await this.favouritesStorage.findOneBy({
      userId: this.userId,
    });
    const index = favourites.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      return;
    }
    favourites.artists.splice(index, 1);
    await this.favouritesStorage.save(favourites);
    return true;
  }

  async addAlbum(id: string) {
    const favourites = await this.favouritesStorage.findOneBy({
      userId: this.userId,
    });
    const album = await this.albumsStorage.findOneBy({ id });
    if (!album) {
      return;
    }
    favourites.albums.push(album);
    await this.favouritesStorage.save(favourites);
    return true;
  }

  async deleteAlbum(id: string) {
    const favourites = await this.favouritesStorage.findOneBy({
      userId: this.userId,
    });
    const index = favourites.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      return;
    }
    favourites.albums.splice(index, 1);
    await this.favouritesStorage.save(favourites);
    return true;
  }

  async addTrack(id: string) {
    const favourites = await this.favouritesStorage.findOneBy({
      userId: this.userId,
    });
    const track = await this.tracksStorage.findOneBy({ id });
    if (!track) {
      return;
    }
    favourites.tracks.push(track);
    await this.favouritesStorage.save(favourites);
    return true;
  }

  async deleteTrack(id: string) {
    const favourites = await this.favouritesStorage.findOneBy({
      userId: this.userId,
    });
    const index = favourites.tracks.findIndex((album) => album.id === id);
    if (index === -1) {
      return;
    }
    favourites.tracks.splice(index, 1);
    await this.favouritesStorage.save(favourites);
    return true;
  }
}
