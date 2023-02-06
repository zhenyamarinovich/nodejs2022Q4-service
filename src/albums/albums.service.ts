import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDTO } from './dto/create-albums.dto';
import { UpdateAlbumDTO } from './dto/update-albums.dto';

@Injectable()
export class AlbumsService {
  constructor(private database: DatabaseService) {}

  getAll() {
    return this.database.albums;
  }

  getById(id) {
    const album = this.database.albums.find((album) => album.id === id);
    if (album) {
      return album;
    }

    throw new NotFoundException();
  }

  create(albumDTO: CreateAlbumDTO) {
    const album = {
      ...albumDTO,
      id: v4(),
    };

    this.database.albums.push(album);

    return album;
  }

  update(id, albumDTO: UpdateAlbumDTO) {
    const index = this.database.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.database.albums[index] = {
      ...this.database.albums[index],
      ...albumDTO,
    };

    return this.database.albums[index];
  }

  remove(id) {
    const index = this.database.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    const indexInFavorites = this.database.favorites.albums.indexOf(id);
    if (indexInFavorites !== -1) {
      this.database.favorites.albums.splice(indexInFavorites, 1);
    }

    this.database.tracks
      .filter((track) => track.albumId === id)
      .forEach((track) => (track.albumId = null));

    this.database.albums.splice(index, 1);
  }
}
