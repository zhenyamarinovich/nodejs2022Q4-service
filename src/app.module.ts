import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { AlbumsController } from './albums/albums.controller';
import { TracksController } from './tracks/tracks.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TracksService } from './tracks/tracks.service';
import { AlbumsService } from './albums/albums.service';
import { ArtistsService } from './artists/artists.service';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ArtistsController,
    AlbumsController,
    TracksController,
    FavoritesController,
    UsersController,
  ],
  providers: [AppService, UsersService, TracksService, AlbumsService, ArtistsService, FavoritesService],
})
export class AppModule {}
