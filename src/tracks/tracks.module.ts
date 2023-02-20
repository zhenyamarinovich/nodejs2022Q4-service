import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
