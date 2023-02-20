import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Track } from './track.entity';

import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, Artist, Album]),
    ArtistsModule,
    AlbumsModule,
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
