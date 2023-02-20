import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  FavotitesAlbum,
  FavotitesArtist,
  FavotitesTrack,
} from './favorites.entity';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavotitesArtist)
    private readonly artistRepository: Repository<FavotitesArtist>,
    @InjectRepository(FavotitesAlbum)
    private readonly albumRepository: Repository<FavotitesAlbum>,
    @InjectRepository(FavotitesTrack)
    private readonly trackRepository: Repository<FavotitesTrack>,
  ) {}

  async getAll() {
    const albumRepositoryData = await this.albumRepository.find({
      relations: ['album'],
    });

    const artistRepositoryData = await this.artistRepository.find({
      relations: ['artist'],
    });

    const trackRepositoryData = await this.trackRepository.find({
      relations: ['track'],
    });

    const albums = albumRepositoryData.map((elem) => elem.album);
    const artists = artistRepositoryData.map((elem) => elem.artist);
    const tracks = trackRepositoryData.map((elem) => elem.track);

    return { albums, artists, tracks };
  }

  async createTrack(id: string) {
    const track = await this.trackRepository.create({ trackId: id });

    console.log(track);
    try {
      return await this.trackRepository.save(track);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async createAlbum(id) {
    const album = this.albumRepository.create({ albumId: id });
    try {
      return await this.albumRepository.save(album);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async createArtist(id) {
    const artist = this.artistRepository.create({ artistId: id });
    try {
      return await this.artistRepository.save(artist);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async removeArtist(id: string) {
    const { affected } = await this.artistRepository.delete({ artistId: id });
    if (!affected) {
      throw new NotFoundException();
    }
    return;
  }

  async removeAlbum(id: string) {
    const { affected } = await this.albumRepository.delete({ albumId: id });
    if (!affected) {
      throw new NotFoundException();
    }
    return;
  }

  async removeTrack(id: string) {
    const { affected } = await this.trackRepository.delete({ trackId: id });
    if (!affected) {
      throw new NotFoundException();
    }
    return;
  }
}
