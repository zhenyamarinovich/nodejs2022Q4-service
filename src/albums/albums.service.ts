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
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    private readonly artistsService: ArtistsService,
  ) {}

  async getAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async getById(id, flag?) {
    const album = await this.albumRepository.findOneBy({ id });

    if (album || flag) {
      return album;
    }

    throw new NotFoundException();
  }

  async getArtistFromDTO(id: string) {
    if (id === null) {
      return null;
    }

    const data = await this.artistsService.getById(id);

    if (!data) {
      throw new BadRequestException();
    }

    return data;
  }

  async create(albumDTO: CreateAlbumDTO) {
    const artist = await this.getArtistFromDTO(albumDTO.artistId);

    const album = new Album(albumDTO.name, albumDTO.year, artist);

    await this.albumRepository.insert(album);

    return album;
  }

  async update(id, albumDTO: UpdateAlbumDTO) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException();
    }

    const artist = await this.getArtistFromDTO(albumDTO.artistId);

    await this.albumRepository.update(id, {
      id,
      name: albumDTO.name,
      year: albumDTO.year,
      artist,
    });

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
