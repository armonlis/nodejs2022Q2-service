import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { IArtist } from "./interfaces";
import { v4 as uuid } from "uuid";
import { CreateArtistDTO } from "./DTO/create-artist.dto";
import { ChangeArtistDTO } from "./DTO/change-artist.dto";
import { FavouritesService } from "src/favourites/favourites.service";

@Injectable()
export class ArtistsService {

  constructor(@Inject(forwardRef(() => FavouritesService)) private readonly favourites: FavouritesService) {};

  private readonly artists: IArtist[] = [];
  
  getAll(): IArtist[] {
    return this.artists;
  };
  
  getById(id: string) {
    const artist = this.artists.find(artist => artist.id === id);
    if (!artist) { return; }
    return artist;
  };

  create(data: CreateArtistDTO): IArtist {
    const artist = { ...data, id: uuid() };
    this.artists.push(artist);
    return artist;
  };

  change(data: ChangeArtistDTO, id: string) {
    let artist = this.artists.find(artist => artist.id === id);
    if (!artist) { return }
    artist = {...artist, ...data};
    console.log("ARTIST>>>>", artist)
    return artist;
  };

  delete(id: string): boolean {
    const index = this.artists.findIndex(artist => artist.id === id);
    if (index === -1) { return }
    this.artists.splice(index, 1);
    this.favourites.deleteArtist(id);
    return true;
  };

};