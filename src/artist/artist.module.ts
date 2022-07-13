import { Module } from "@nestjs/common";
import { ArtistsController } from "./artist.controller";
import { ArtistsService } from "./artist.service";
import { FavouritesModule } from "src/favourites/favourites.module";

@Module({
  imports: [FavouritesModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService]
})
export class AtristsModule {};
