import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private database: DatabaseService) {}

  getAll() {
    return this.database.tracks;
  }

  getById(id) {
    const track = this.database.tracks.find((track) => track.id === id);
    if (track) {
      return track;
    }

    throw new NotFoundException();
  }

  create(trackDTO: CreateTrackDTO) {
    const track = {
      id: v4(),
      ...trackDTO,
    };

    this.database.tracks.push(track);

    return track;
  }

  update(id, trackDTO: UpdateTrackDTO) {
    const index = this.database.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    const track = this.database.tracks[index];

    track.name = trackDTO.name;
    track.artistId = trackDTO.artistId;
    track.albumId = trackDTO.albumId;
    track.duration = trackDTO.duration;

    return track;
  }

  remove(id) {
    const index = this.database.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }
    const indexInFavorites = this.database.favorites.tracks.indexOf(id);
    if (index !== -1) {
      this.database.favorites.tracks.splice(indexInFavorites, 1);
    }

    this.database.tracks.splice(index, 1);
  }
}
