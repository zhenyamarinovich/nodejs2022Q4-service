import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  createTrack(@Param('id', new ParseUUIDPipe()) id) {
    return this.favoritesService.createTrack(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id', new ParseUUIDPipe()) id) {
    return this.favoritesService.createAlbum(id);
  }

  @Post('artist/:id')
  createArtist(@Param('id', new ParseUUIDPipe()) id) {
    return this.favoritesService.createArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe()) id) {
    return this.favoritesService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id) {
    return this.favoritesService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe()) id) {
    return this.favoritesService.removeArtist(id);
  }
}
