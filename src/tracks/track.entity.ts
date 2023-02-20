import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Expose, Transform } from 'class-transformer';

import { Artist } from 'src/artists/artist.entity';
import { Album } from 'src/albums/album.entity';

@Entity()
export class Track {
  constructor(
    name: string,
    duration: number,
    artist: Artist | null,
    album: Album | null,
  ) {
    this.name = name;
    this.duration = duration;
    this.artist = artist;
    this.album = album;
  }

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artist: Artist | null;

  @ManyToOne(() => Album, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'albumId' })
  @Transform(({ value }) => (value ? value.id : null))
  album: Album | null;
}
