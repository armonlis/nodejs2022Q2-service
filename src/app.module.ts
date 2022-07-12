import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtristsModule } from './artist/artist.module';
import { UserModule } from './user/users.module';

@Module({
  imports: [AtristsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
