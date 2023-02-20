import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async getAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async getById(id) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async create(artistDTO: CreateArtistDTO) {
    const newArtist = this.artistRepository.create(artistDTO);
    return await this.artistRepository.save(newArtist);
  }

  async update(id, artistDTO: UpdateArtistDTO) {
    const entity = await this.artistRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    for (const key in artistDTO) {
      if (Object.prototype.hasOwnProperty.call(artistDTO, key)) {
        const element = artistDTO[key];
        entity[key] = element;
      }
    }
    await this.artistRepository.update({ id }, artistDTO);
    return entity;
  }

  async remove(id) {
    const { affected } = await this.artistRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
    return;
  }
}
