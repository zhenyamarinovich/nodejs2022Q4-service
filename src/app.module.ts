import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';

import { dataSourceOptions } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging/logging.service';
import { LoggingModule } from './logging/logging.module';
import { LoggingMiddleware } from './logging/logging.midelware';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    FavoritesModule,
    ArtistsModule,
    AlbumsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    LoggingModule,
  ],
  providers: [LoggingService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
