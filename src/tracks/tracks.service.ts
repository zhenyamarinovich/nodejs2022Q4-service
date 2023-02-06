import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks = [];

  getAll() {
    return this.tracks;
  }

  getById(id) {
    const track = this.tracks.find((track) => track.id === id);
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

    this.tracks.push(track);

    return track;
  }

  update(id, trackDTO: UpdateTrackDTO) {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.tracks[index] = {
      ...this.tracks[index],
      ...trackDTO,
    };

    return this.tracks[index];
  }

  remove(id) {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index !== -1) {
      const [track] = this.tracks.splice(index, 1);
      return track;
    }
    throw new NotFoundException();
  }
}
