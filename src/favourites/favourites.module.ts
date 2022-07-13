import { Module, forwardRef } from "@nestjs/common";
import { FavouritesController } from "./favourites.controller";
import { FavouritesService } from "./favourites.service";
import { AtristsModule } from "src/artist/artist.module";

@Module({
  imports: [forwardRef(() => AtristsModule)],
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService]   
})
export class FavouritesModule {};