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
  
  getById(id: string): IArtist | null {
    const artist = this.artists.find(artist => artist.id === id) as IArtist | -1;
    return artist === -1 ? null : artist
  };

  create(data: CreateArtistDTO): IArtist {
    const artist = { ...data, id: uuid() };
    this.artists.push(artist);
    return artist;
  };

  change(data: ChangeArtistDTO, id: string): IArtist | null {
    const artist = this.artists.find(artist => artist.id === id) as IArtist | -1;
    if (artist === -1) { return null }
    artist.name = data?.name ?? artist.name;
    artist.grammy = data?.grammy ?? artist.grammy;
    return artist;
  };

  delete(id: string): boolean {
    const index = this.artists.findIndex(artist => artist.id === id);
    if (index === -1) { return false }
    this.artists.splice(index, 1);
    this.favourites.deleteArtist(id);
    return true;
  };

};