import { IAlbum } from 'src/album/interfaces';
import { IArtist } from 'src/artist/interfaces';
import { ITrack } from 'src/track/interfaces';

export interface IFavourites {
  artists: string[];
  tracks: string[];
  albums: string[];
}

export interface IFavouritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
