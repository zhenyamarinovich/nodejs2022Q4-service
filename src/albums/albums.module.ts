import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Album } from './album.entity';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

import { ArtistsModule } from 'src/artists/artists.module';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Track]), ArtistsModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
