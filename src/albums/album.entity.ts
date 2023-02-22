import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Artist } from 'src/artists/artist.entity';

@Entity('album')
export class Album {
  constructor(name: string, year: number, artist: Artist | null) {
    this.name = name;
    this.year = year;
    this.artist = artist;
  }

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ name: 'artist_id', type: 'uuid', default: null })
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: Artist;
}
