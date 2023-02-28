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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.tracksService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id) {
    return this.tracksService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTrackDTO: CreateTrackDTO) {
    return this.tracksService.create(createTrackDTO);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id,
    @Body() updateTrackDTO: UpdateTrackDTO,
  ) {
    return this.tracksService.update(id, updateTrackDTO);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id) {
    return this.tracksService.remove(id);
  }
}
