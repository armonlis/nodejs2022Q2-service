import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtristsModule } from './artist/artist.module';
import { UserModule } from './user/users.module';
import { FavouritesModule } from './favourites/favourites.module';
import { AlbumsModule } from './album/albums.module';
import { TrackModule } from './track/tracks.module';

@Module({
  imports: [AtristsModule, UserModule, FavouritesModule, AlbumsModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};
