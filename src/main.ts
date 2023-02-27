import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';
import { HttpExceptionFilter } from './logging/exception-filter';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
  });

  process
    .on('unhandledRejection', () => {
      app.get(LoggingService).error('Unhandled rejection');
    })
    .on('uncaughtException', () => {
      app.get(LoggingService).error('Uncaught exception');
    });

  app.useLogger(app.get(LoggingService));

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const document = await readFile(join(__dirname, '../doc/api.yaml'), 'utf-8');
  SwaggerModule.setup('api', app, parse(document));

  await app.listen(PORT);
}
bootstrap();
