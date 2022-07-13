import { Controller, Post, Body, Put, Param, ParseUUIDPipe, NotFoundException, Delete, HttpCode, Get } from "@nestjs/common";
import { IAlbum } from "./interfaces";
import { AlbumsService } from "./albums.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/updateAlbum.dto";

@Controller("album")
export class AlbumsController {

constructor(private readonly albums: AlbumsService) {};

@Post()
addAlbum(@Body() createAlbumDto: CreateAlbumDto): IAlbum {
  return this.albums.add(createAlbumDto);
};

@Put(":id")
updateAlbum(@Param("id", ParseUUIDPipe) id: string, @Body() updateAlbumDto: UpdateAlbumDto): IAlbum {
  const result = this.albums.update(updateAlbumDto, id);
  if (!result) { throw new NotFoundException(`The album with id=${id} is not exist.`) }
  return result;
};

@Delete(":id")
@HttpCode(204)
deleteAlbum(@Param("id", ParseUUIDPipe) id: string) {
  const result = this.albums.delete(id);
  if (!result) { throw new NotFoundException(`The album with id=${id} is not exist.`) }
  return;
};

@Get()
getAllAlbums() {
  return this.albums.getAll();
};

@Get(":id")
getAlbumById(@Param("id", ParseUUIDPipe) id: string) {
  const result = this.albums.get(id);
  if (!result) { throw new NotFoundException(`The album with id=${id} is not exist.`) }
  return result;
};

};

