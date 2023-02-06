import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { AlbumsController } from './albums/albums.controller';
import { TracksController } from './tracks/tracks.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { UsersController } from './users/users.controller';

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
  providers: [AppService],
})
export class AppModule {}
