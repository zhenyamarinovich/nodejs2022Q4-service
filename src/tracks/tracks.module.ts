import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Track } from './track.entity';

import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Artist, Album]), AuthModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
