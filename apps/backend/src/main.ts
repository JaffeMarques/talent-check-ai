import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const url = process.env.URL || 'http://localhost';
  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`running on: ${url}:${port}/${globalPrefix}`);
}

bootstrap();
