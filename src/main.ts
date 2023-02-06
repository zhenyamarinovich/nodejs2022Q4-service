import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const document = await readFile(join(__dirname, '../doc/api.yaml'), 'utf-8');
  SwaggerModule.setup('api', app, parse(document));

  await app.listen(PORT);
}
bootstrap();
