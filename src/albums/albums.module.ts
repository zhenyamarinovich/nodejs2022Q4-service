import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
