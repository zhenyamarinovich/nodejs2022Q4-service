import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Expose, Transform } from 'class-transformer';

import { Artist } from 'src/artists/artist.entity';

@Entity()
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

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artist: Artist | null;
}
