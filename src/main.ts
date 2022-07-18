import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './validation/validation.pipe';
import * as dotenv from "dotenv";
import { AppDataSource } from './typeorm/data-source';
import { stdout } from 'process';

dotenv.config();

const PORT = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}

AppDataSource.initialize()
  .then(async () => {
    bootstrap();
  })
  .catch(error => stdout.write(`ERROR >>> ${error}.\n`)); 

