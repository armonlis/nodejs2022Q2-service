import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtristsModule } from './artist/artist.module';

@Module({
  imports: [AtristsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
