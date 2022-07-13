import { Module, forwardRef } from "@nestjs/common";
import { AlbumsController } from "./albums.cotroller";
import { AlbumsService } from "./albums.service";
import { FavouritesModule } from "src/favourites/favourites.module";

@Module({
  imports: [forwardRef(() => FavouritesModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService]
})
export class AlbumsModule {};