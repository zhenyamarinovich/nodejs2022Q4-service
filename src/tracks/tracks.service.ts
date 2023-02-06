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
      ...trackDTO,
      id: v4(),
    };

    this.database.tracks.push(track);

    return track;
  }

  update(id, trackDTO: UpdateTrackDTO) {
    const index = this.database.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.database.tracks[index] = {
      ...this.database.tracks[index],
      ...trackDTO,
    };

    return this.database.tracks[index];
  }

  remove(id) {
    const index = this.database.tracks.findIndex((track) => track.id === id);

    if (index !== -1) {
      const [track] = this.database.tracks.splice(index, 1);
      return track;
    }
    throw new NotFoundException();
  }
}
