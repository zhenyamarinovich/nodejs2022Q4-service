import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';

import { dataSourceOptions } from './ormconfig';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    FavoritesModule,
    ArtistsModule,
    AlbumsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
