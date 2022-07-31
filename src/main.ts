import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './validation/validation.pipe';
import * as dotenv from 'dotenv';
import { AppDataSource } from './typeorm/data-source';
import { LogService } from './logging/log.service';
import { AllErrorsExceptionFilter } from './logging/all-errors.filter';

export const logger = new LogService();

dotenv.config();

const PORT = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllErrorsExceptionFilter(httpAdapter));
  await app.listen(PORT);
}

AppDataSource.initialize()
  .then(async () => {
    //throw new Error("ERROR!!!");
    bootstrap();
  })
  .catch((error) => logger.error(`${error.message}`));
