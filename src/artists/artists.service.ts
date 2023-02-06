import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private database: DatabaseService) {}

  getAll() {
    return this.database.artists;
  }

  getById(id) {
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (artist) {
      return artist;
    }

    throw new NotFoundException();
  }

  create(artistDTO: CreateArtistDTO) {
    const artist = {
      ...artistDTO,
      id: v4(),
    };

    this.database.artists.push(artist);

    return artist;
  }

  update(id, artistDTO: UpdateArtistDTO) {
    const index = this.database.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.database.artists[index] = {
      ...this.database.artists[index],
      ...artistDTO,
    };

    return this.database.artists[index];
  }

  remove(id) {
    const index = this.database.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    const indexInFavorites = this.database.favorites.artists.indexOf(id);
    if (index !== -1) {
      this.database.favorites.artists.splice(indexInFavorites, 1);
    }

    this.database.tracks
      .filter((track) => track.artistId === id)
      .forEach((track) => (track.artistId = null));

    this.database.albums
      .filter((album) => album.artistId === id)
      .forEach((album) => (album.artistId = null));

    this.database.artists.splice(index, 1);
  }
}
