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
    const artist = this.artistRepository.create(artistDTO);
    return await this.artistRepository.save(artist);
  }

  async update(id, artistDTO: UpdateArtistDTO) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException();
    }

    await this.artistRepository.update({ id }, artistDTO);
    return await this.artistRepository.findOneBy({ id });
  }

  async remove(id) {
    const { affected } = await this.artistRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
    return;
  }
}
