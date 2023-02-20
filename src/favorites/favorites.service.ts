import {
  BadRequestException,
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
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavotitesArtist)
    private readonly artistRepository: Repository<FavotitesArtist>,
    @InjectRepository(FavotitesAlbum)
    private readonly albumRepository: Repository<FavotitesAlbum>,
    @InjectRepository(FavotitesTrack)
    private readonly trackRepository: Repository<FavotitesTrack>,

    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  async getAll() {
    return {
      artists: await this.artistsService.getAll(),
      albums: await this.albumsService.getAll(),
      tracks: await this.tracksService.getAll(),
    };
  }

  async createTrack(id) {
    const track = await this.tracksService.getById(id, true);

    if (!track) {
      throw new UnprocessableEntityException();
    }

    const data = await this.trackRepository.findOneBy({ id });

    if (data) {
      throw new BadRequestException();
    }

    const favoritesData = new FavotitesTrack(track);
    await this.trackRepository.create(favoritesData);
    return data;
  }

  async createAlbum(id) {
    const album = await this.albumsService.getById(id, true);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    const data = await this.albumRepository.findOneBy({ id });

    if (data) {
      throw new BadRequestException();
    }

    const favoritesData = new FavotitesAlbum(album);
    await this.albumRepository.create(favoritesData);
    return data;
  }

  async createArtist(id) {
    const artist = await this.artistsService.getById(id, true);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    const data = await this.artistRepository.findOneBy({ id });

    if (data) {
      throw new BadRequestException();
    }

    const favoritesData = new FavotitesArtist(artist);

    await this.artistRepository.create(favoritesData);

    return data;
  }

  async removeArtist(id: string) {
    const artist = await this.artistsService.getById(id);

    if (!artist) {
      throw new NotFoundException();
    }

    const data = await this.artistRepository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException();
    }

    await this.artistRepository.delete(data);
    return data;
  }

  async removeAlbum(id: string) {
    const album = await this.albumsService.getById(id);

    if (!album) {
      throw new NotFoundException();
    }

    const data = await this.albumRepository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException();
    }

    await this.albumRepository.delete(data);
    return data;
  }

  async removeTrack(id: string) {
    const track = await this.tracksService.getById(id);

    if (!track) {
      throw new NotFoundException();
    }

    const data = await this.trackRepository.findOneBy({ id });

    if (!data) {
      throw new NotFoundException();
    }

    await this.trackRepository.delete(data);
    return data;
  }
}
