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
import { AlbumsService } from './albums.service';
import { CreateAlbumDTO } from './dto/create-albums.dto';
import { UpdateAlbumDTO } from './dto/update-albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.albumsService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id) {
    return this.albumsService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAlbumDTO: CreateAlbumDTO) {
    return this.albumsService.create(createAlbumDTO);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id,
    @Body() updateAlbumDTO: UpdateAlbumDTO,
  ) {
    return this.albumsService.update(id, updateAlbumDTO);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id) {
    return this.albumsService.remove(id);
  }
}
