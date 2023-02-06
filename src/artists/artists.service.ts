import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class ArtistsService {
  constructor(private database: DatabaseService) {}

  getAll() {
    return this.database.artists;
  }

  getById(id) {
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (artist) {
      return artist;
    }

    throw new NotFoundException();
  }

  create(artistDTO: CreateArtistDTO) {
    const artist = {
      ...artistDTO,
      id: v4(),
    };

    this.database.artists.push(artist);

    return artist;
  }

  update(id, artistDTO: UpdateArtistDTO) {
    const index = this.database.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.database.artists[index] = {
      ...this.database.artists[index],
      ...artistDTO,
    };

    return this.database.artists[index];
  }

  remove(id) {
    const index = this.database.artists.findIndex((artist) => artist.id === id);

    if (index !== -1) {
      const [artist] = this.database.artists.splice(index, 1);

      this.database.tracks.forEach((track) => {
        if (track.artistId === id) {
          const editTrack = {
            ...track,
            artistId: null,
          };
          console.log(editTrack);
          return editTrack;
        }
        return track;
      });

      return artist;
    }
    throw new NotFoundException();
  }
}
