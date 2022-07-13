import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { ArtistsService } from "src/artist/artist.service";
import { IFavourites, IFavouritesResponse } from "./interfaces";

@Injectable()
export class FavouritesService {

  constructor(@Inject(forwardRef(() => ArtistsService)) private readonly artists: ArtistsService) {};
  
  private readonly favourites: IFavourites = {artists: [], tracks: [], albums: [] };

  get() {
    const res: IFavouritesResponse = {artists: []};
    this.favourites.artists.forEach(id => res.artists.push(this.artists.getById(id)));
    return res;
  };
  
  addArtist(id: string) {
    const artist = this.artists.getById(id);
    if (!artist) { return }
    this.favourites.artists.push(id);
    return artist;
  };

  deleteArtist(id: string) {
    const index = this.favourites.artists.findIndex(index => index === id);
    if (index === -1) { return }
    this.favourites.artists.splice(index, 1);
    return true;
  };

};