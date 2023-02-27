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

import { ArtistsService } from './artists.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id) {
    return this.artistsService.getById(id);
  }

  @Post()
  create(@Body() createArtistDTO: CreateArtistDTO) {
    return this.artistsService.create(createArtistDTO);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id,
    @Body() updateArtistDTO: UpdateArtistDTO,
  ) {
    return this.artistsService.update(id, updateArtistDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id) {
    return this.artistsService.remove(id);
  }
}
