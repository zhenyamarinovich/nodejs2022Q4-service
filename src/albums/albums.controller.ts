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
import { AlbumsService } from './albums.service';
import { CreateAlbumDTO } from './dto/create-albums.dto';
import { UpdateAlbumDTO } from './dto/update-albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id) {
    return this.albumsService.getById(id);
  }

  @Post()
  create(@Body() createAlbumDTO: CreateAlbumDTO) {
    return this.albumsService.create(createAlbumDTO);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id,
    @Body() updateAlbumDTO: UpdateAlbumDTO,
  ) {
    return this.albumsService.update(id, updateAlbumDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id) {
    return this.albumsService.remove(id);
  }
}
