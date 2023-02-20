import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async create(trackDTO: CreateTrackDTO) {
    try {
      const newTrack = await this.trackRepository.create(trackDTO);
      return await this.trackRepository.save(newTrack);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id, trackDTO: UpdateTrackDTO) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException();
    }

    try {
      await this.trackRepository.update({ id }, trackDTO);
    } catch (error) {
      throw new NotFoundException();
    }
    return await this.trackRepository.findOneBy({ id });
  }

  async remove(id) {
    const { affected } = await this.trackRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
    return;
  }
}
