import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';

@Entity('FavotitesArtist')
export class FavotitesArtist {
  constructor(artist: Artist) {
    this.artist = artist;
  }

  @Column({ name: 'artistId', type: 'uuid', primary: true, unique: true })
  @Exclude()
  id: string;

  @ManyToOne(() => Artist, null, { onDelete: 'CASCADE' })
  artist: Artist;
}

@Entity('FavotitesAlbum')
export class FavotitesAlbum {
  constructor(album: Album) {
    this.album = album;
  }

  @Column({ name: 'albumId', type: 'uuid', primary: true, unique: true })
  @Exclude()
  id: string;

  @ManyToOne(() => Album, null, { onDelete: 'CASCADE' })
  album: Album;
}

@Entity('FavotitesTrack')
export class FavotitesTrack {
  constructor(track: Track) {
    this.track = track;
  }
  @Column({ name: 'trackId', type: 'uuid', primary: true, unique: true })
  @Exclude()
  id: string;

  @ManyToOne(() => Track, null, { onDelete: 'CASCADE' })
  track: Track;
}
