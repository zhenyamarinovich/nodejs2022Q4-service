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
    private readonly artirstRepository: Repository<Artist>,
  ) {}

  async getAll(): Promise<Artist[]> {
    return this.artirstRepository.find();
  }

  async getById(id) {
    const artist = await this.artirstRepository.findOneBy({ id });

    if (artist) {
      return artist;
    }

    throw new NotFoundException();
  }

  async create(artistDTO: CreateArtistDTO) {
    const artist = new Artist(artistDTO.name, artistDTO.grammy);

    await this.artirstRepository.insert(artist);

    return artist;
  }

  async update(id, artistDTO: UpdateArtistDTO) {
    const artist = await this.artirstRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException();
    }

    await this.artirstRepository.update(id, { ...artistDTO });

    return await this.artirstRepository.findOneBy({ id });
  }

  async remove(id) {
    const artist = await this.artirstRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException();
    }

    await this.artirstRepository.delete(id);
  }
}
