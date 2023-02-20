import {
  Entity,
  JoinColumn,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';

@Entity('favorites_artist')
export class FavotitesArtist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'artist_id', type: 'uuid' })
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: Artist;
}

@Entity('favorites_album')
export class FavotitesAlbum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'album_id', type: 'uuid' })
  albumId: string | null;

  @ManyToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: Album;
}

@Entity('favorites_track')
export class FavotitesTrack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'track_id', type: 'uuid' })
  trackId: string | null;

  @ManyToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'track_id', referencedColumnName: 'id' })
  track: Track;
}
