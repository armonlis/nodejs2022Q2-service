import { Module, forwardRef } from "@nestjs/common";
import { AtristsModule } from "src/artist/artist.module";
import { AlbumsModule } from "src/album/albums.module";
import { TracksController } from "./tracks.controller";
import { TracksService } from "./tracks.service";
import { FavouritesModule } from "src/favourites/favourites.module";


@Module({
  imports: [forwardRef(() => AtristsModule), forwardRef(() => AlbumsModule), forwardRef(() => FavouritesModule)],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService]
})
export class TrackModule {};