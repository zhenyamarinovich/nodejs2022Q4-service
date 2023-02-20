import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async create(albumDTO: CreateAlbumDTO) {
    try {
      const newAlbum = this.albumRepository.create(albumDTO);
      return await this.albumRepository.save(newAlbum);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id, albumDTO: UpdateAlbumDTO) {
    const entity = await this.albumRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }

    for (const key in albumDTO) {
      if (Object.prototype.hasOwnProperty.call(albumDTO, key)) {
        const element = albumDTO[key];
        entity[key] = element;
      }
    }
    try {
      await this.albumRepository.update({ id }, albumDTO);
    } catch (error) {
      throw new NotFoundException();
    }
    return entity;
  }

  async remove(id) {
    const { affected } = await this.albumRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
    return;
  }
}
