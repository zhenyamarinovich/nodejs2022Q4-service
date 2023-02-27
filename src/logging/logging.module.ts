import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { LoggingMiddleware } from './logging.midelware';

@Module({
  providers: [LoggingService, LoggingMiddleware],
  controllers: [LoggingController],
})
export class LoggingModule {}
