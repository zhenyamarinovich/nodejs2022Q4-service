import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import {
  FavotitesAlbum,
  FavotitesArtist,
  FavotitesTrack,
} from './favorites.entity';
import { Artist } from '../artists/artist.entity';
import { Album } from '../albums/album.entity';
import { Track } from '../tracks/track.entity';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavotitesAlbum,
      FavotitesTrack,
      FavotitesArtist,
      Artist,
      Album,
      Track,
    ]),
    ArtistsModule,
    AlbumsModule,
    TracksModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, DatabaseService],
})
export class FavoritesModule {}
