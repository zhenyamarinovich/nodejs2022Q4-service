import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  users = [];
  tracks = [];
  artists = [];
  albums = [];
  favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
