import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(
    '/teacher/uploads',
    express.static(join(process.cwd(), '/src/teacher/uploads')),
  );
  app.use(
    '/user/uploads',
    express.static(join(process.cwd(), '/src/user/uploads')),
  );

  app.use(
    '/admin/uploads',
    express.static(join(process.cwd(), '/src/admin/uploads')),
  );
  await app.listen(3000);
}
bootstrap();
