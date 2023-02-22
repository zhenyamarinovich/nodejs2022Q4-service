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
      const album = this.albumRepository.create(albumDTO);
      return await this.albumRepository.save(album);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id, albumDTO: UpdateAlbumDTO) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException();
    }

    try {
      await this.albumRepository.update({ id }, albumDTO);
    } catch (error) {
      throw new NotFoundException();
    }
    return await this.albumRepository.findOneBy({ id });
  }

  async remove(id) {
    const { affected } = await this.albumRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
    return;
  }
}
