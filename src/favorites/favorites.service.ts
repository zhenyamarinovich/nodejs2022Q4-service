import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private database: DatabaseService) {}

  getAll() {
    return {
      artists: this.database.favorites.artists.map((id) =>
        this.database.artists.find((artist) => artist.id === id),
      ),

      tracks: this.database.favorites.tracks.map((id) =>
        this.database.tracks.find((track) => track.id === id),
      ),

      albums: this.database.favorites.albums.map((id) =>
        this.database.albums.find((album) => album.id === id),
      ),
    };
  }

  createTrack(id) {
    const track = this.database.tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException();
    }
    this.database.favorites.tracks.push(id);
    return id;
  }

  createAlbum(id) {
    const album = this.database.albums.find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException();
    }
    this.database.favorites.albums.push(id);
    return id;
  }

  createArtist(id) {
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException();
    }
    this.database.favorites.artists.push(id);
    return id;
  }

  removeTrack(id) {
    const index = this.database.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (index === -1) {
      throw new NotFoundException();
    }
    this.database.favorites.tracks.splice(index, 1);
  }

  removeAlbum(id) {
    const index = this.database.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (index === -1) {
      throw new NotFoundException();
    }
    this.database.favorites.albums.splice(index, 1);
  }

  removeArtist(id) {
    const index = this.database.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (index === -1) {
      throw new NotFoundException();
    }

    this.database.favorites.artists.splice(index, 1);
  }
}
