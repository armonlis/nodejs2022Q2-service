export interface IFavourites {
  artists: string[];
  tracks: string[];
  albums: string[];
}

interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

interface ITrack {
  id: string;
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;
}

export interface IFavouritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
