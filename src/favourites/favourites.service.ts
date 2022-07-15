import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { ArtistsService } from "src/artist/artist.service";
import { AlbumsService } from "src/album/albums.service";
import { TracksService } from "src/track/tracks.service";
import { IFavourites, IFavouritesResponse } from "./interfaces";

@Injectable()
export class FavouritesService {

  constructor(@Inject(forwardRef(() => ArtistsService)) private readonly artists: ArtistsService,
    @Inject(forwardRef(() => AlbumsService)) private readonly albums: AlbumsService,
    @Inject(forwardRef(() => TracksService)) private readonly tracks: TracksService
  ) {};
  
  private readonly favourites: IFavourites = {artists: [], tracks: [], albums: [] };

  get() {
    const res: IFavouritesResponse = {artists: [], albums: [], tracks: []};
    this.favourites.artists.forEach(id => res.artists.push(this.artists.getById(id)));
    this.favourites.albums.forEach(id => res.albums.push(this.albums.get(id)));
    this.favourites.tracks.forEach(id => res.tracks.push(this.tracks.get(id)));
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

  addAlbum(id: string) {
    const album = this.albums.get(id);
    if (!album) { return }
    this.favourites.albums.push(id);
    return album;
  };

  deleteAlbum(id: string) {
    const index = this.favourites.albums.findIndex(index => index === id);
    if (index === -1) { return }
    this.favourites.albums.splice(index, 1);
    return true;
  };

  addTrack(id: string) {
    const track = this.tracks.get(id);
    if (!track) { return }
    this.favourites.tracks.push(id);
    return track;
  };

  deleteTrack(id: string) {
    const index = this.favourites.tracks.findIndex(index => index === id);
    if (index === -1) { return }
    this.favourites.tracks.splice(index, 1);
    return true;
  };

};