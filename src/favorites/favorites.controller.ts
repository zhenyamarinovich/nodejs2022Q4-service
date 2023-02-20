import {
  Controller,
  Delete,
  Get,
  HttpCode,
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
  async createTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.createTrack(id);
  }

  @Post('artist/:id')
  async createArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.createArtist(id);
  }

  @Post('album/:id')
  async createAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.createAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.removeArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.removeAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.removeTrack(id);
  }
}
