import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDTO } from './dto/create-albums.dto';
import { UpdateAlbumDTO } from './dto/update-albums.dto';
import { Album } from './album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async getAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async getById(id) {
    const album = await this.albumRepository.findOneBy({ id });

    if (album) {
      return album;
    }

    throw new NotFoundException();
  }

  async create(albumDTO: CreateAlbumDTO) {
    const album = new Album(albumDTO.name, albumDTO.year, albumDTO.artistId);

    await this.albumRepository.insert(album);

    return album;
  }

  async update(id, albumDTO: UpdateAlbumDTO) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException();
    }

    await this.albumRepository.update(id, { ...albumDTO });

    return await this.albumRepository.findOneBy({ id });
  }

  async remove(id) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException();
    }

    await this.albumRepository.delete(id);
  }
}
