export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface IAddedAlbum {
  name: string;
  year: number;
  artistId?: string | null;
}

export interface IUpdatedAlbum {
  name?: string;
  year?: number;
  artistId?: string | null;
}
