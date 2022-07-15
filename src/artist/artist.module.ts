import { Module, forwardRef } from "@nestjs/common";
import { TrackModule } from "src/track/tracks.module";
import { ArtistsController } from "./artist.controller";
import { ArtistsService } from "./artist.service";
import { FavouritesModule } from "src/favourites/favourites.module";

@Module({
  imports: [FavouritesModule, forwardRef(() => TrackModule)],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService]
})
export class AtristsModule {};
