import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

import {
  FavotitesAlbum,
  FavotitesArtist,
  FavotitesTrack,
} from './favorites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavotitesAlbum, FavotitesTrack, FavotitesArtist]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
