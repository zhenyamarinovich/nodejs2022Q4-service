import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';
import { Track } from './track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAll() {
    return this.trackRepository.find();
  }

  async getById(id) {
    const track = await this.trackRepository.findOneBy({ id });
    if (track) {
      return track;
    }

    throw new NotFoundException();
  }

  async create(trackDTO: CreateTrackDTO) {
    const track = new Track(
      trackDTO.name,
      trackDTO.artistId,
      trackDTO.albumId,
      trackDTO.duration,
    );

    await this.trackRepository.insert(track);

    return track;
  }

  async update(id, trackDTO: UpdateTrackDTO) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException();
    }

    await this.trackRepository.update(id, { ...trackDTO });

    return await this.trackRepository.findOneBy({ id });
  }

  async remove(id) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException();
    }

    await this.trackRepository.delete(id);
  }
}
