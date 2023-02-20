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
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  async getAll() {
    return this.trackRepository.find();
  }

  async getById(id, flag?) {
    const track = await this.trackRepository.findOneBy({ id });
    if (track || flag) {
      return track;
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

  async getAlbumFromDTO(id: string) {
    if (id === null) {
      return null;
    }

    const data = await this.albumsService.getById(id);

    if (!data) {
      throw new BadRequestException();
    }

    return data;
  }

  async create(trackDTO: CreateTrackDTO) {
    const artist = await this.getArtistFromDTO(trackDTO.artistId);
    const album = await this.getAlbumFromDTO(trackDTO.albumId);

    const track = new Track(trackDTO.name, trackDTO.duration, artist, album);

    await this.trackRepository.insert(track);

    return track;
  }

  async update(id, trackDTO: UpdateTrackDTO) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException();
    }

    const artist = await this.getArtistFromDTO(trackDTO.artistId);
    const album = await this.getAlbumFromDTO(trackDTO.albumId);

    await this.trackRepository.update(id, {
      name: trackDTO.name,
      duration: trackDTO.duration,
      artist,
      album,
    });

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
