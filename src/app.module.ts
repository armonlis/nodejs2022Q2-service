import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtristsModule } from './artist/artist.module';
import { UserModule } from './user/users.module';
import { FavouritesModule } from './favourites/favourites.module';
import { AlbumsModule } from './album/albums.module';
import { TrackModule } from './track/tracks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AtristsModule,
    UserModule,
    FavouritesModule,
    AlbumsModule,
    TrackModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
