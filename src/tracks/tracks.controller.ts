import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id) {
    return this.tracksService.getById(id);
  }

  @Post()
  create(@Body() createTrackDTO: CreateTrackDTO) {
    return this.tracksService.create(createTrackDTO);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id,
    @Body() updateTrackDTO: UpdateTrackDTO,
  ) {
    return this.tracksService.update(id, updateTrackDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id) {
    return this.tracksService.remove(id);
  }
}
