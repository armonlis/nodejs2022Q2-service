import { Injectable } from '@nestjs/common';
import { IAddedAlbum, IUpdatedAlbum } from './interfaces';
import { AppDataSource } from 'src/typeorm/data-source';
import { Album } from 'src/typeorm/entity/albums';

@Injectable()
export class AlbumsService {
  private readonly albumsStorage = AppDataSource.getRepository(Album);

  async add(body: IAddedAlbum) {
    const album = { ...new Album(), ...body };
    await this.albumsStorage.save(album);
    return album;
  }

  async update(body: IUpdatedAlbum, id: string) {
    let album = await this.albumsStorage.findOneBy({ id });
    if (!album) {
      return;
    }
    album = { ...album, ...body };
    return album;
  }

  async delete(id: string) {
    const album = await this.albumsStorage.findOneBy({ id });
    if (!album) {
      return;
    }
    await this.albumsStorage.remove(album);
    return true;
  }

  async getAll() {
    const result = await this.albumsStorage.find();
    return result;
  }

  async get(id: string) {
    const result = await this.albumsStorage.findOneBy({ id });
    return result;
  }
}
