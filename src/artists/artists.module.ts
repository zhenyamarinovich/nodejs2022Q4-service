import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Artist } from './artist.entity';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

import { Album } from 'src/albums/album.entity';
import { Track } from 'src/tracks/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
