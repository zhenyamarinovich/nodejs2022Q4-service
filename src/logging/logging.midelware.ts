import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Request: method -> ${req.method} url-> ${
        req.originalUrl
      }; body -> ${JSON.stringify(req.body)}`,
    );

    next();
  }
}
