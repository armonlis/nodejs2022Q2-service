import { Module, forwardRef } from "@nestjs/common";
import { FavouritesController } from "./favourites.controller";
import { FavouritesService } from "./favourites.service";
import { AtristsModule } from "src/artist/artist.module";
import { AlbumsModule } from "src/album/albums.module";
import { TrackModule } from "src/track/tracks.module";

@Module({
  imports: [forwardRef(() => AtristsModule), forwardRef(() => AlbumsModule), forwardRef(() => TrackModule)],
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService]   
})
export class FavouritesModule {};