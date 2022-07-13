import { IArtist } from "src/artist/interfaces"

export interface IFavourites {
  artists: string[],
  tracks: string[],
  albums: string[]
};

export interface IFavouritesResponse {
  artists: IArtist[]
};