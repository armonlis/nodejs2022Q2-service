import { Controller, Post, Get, Delete, UnprocessableEntityException, Param, ParseUUIDPipe, HttpCode} from "@nestjs/common";
import { FavouritesService } from "./favourites.service";

@Controller("favs")
export class FavouritesController {
  constructor(private readonly favourites: FavouritesService) {};

  @Post("artist/:id")
  createFavouritesArtist(@Param("id", ParseUUIDPipe) id: string) {
    const result = this.favourites.addArtist(id);
    if (!result) { throw new UnprocessableEntityException("A such artist does not exist.") }
    return `The artist ${result.name} was added to favourites.`
  };

  @Delete("artist/:id")
  @HttpCode(204)
  deleteFavouritesArtist(@Param("id", ParseUUIDPipe) id: string) {
    const result = this.favourites.deleteArtist(id);
    if (!result) { throw new UnprocessableEntityException("A such artist does not exist.") }
    return;
  };

  @Get()
  getFavourites() {
    return this.favourites.get();
  };

};