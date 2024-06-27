import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  await configService.get<string>('DATABASE_URL');

  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  await app.listen(3000);
}
bootstrap();
