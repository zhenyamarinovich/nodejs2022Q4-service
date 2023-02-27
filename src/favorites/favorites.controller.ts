import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post('track/:id')
  async createTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.createTrack(id);
  }

  @UseGuards(AuthGuard)
  @Post('artist/:id')
  async createArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.createArtist(id);
  }

  @UseGuards(AuthGuard)
  @Post('album/:id')
  async createAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.createAlbum(id);
  }

  @UseGuards(AuthGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.removeArtist(id);
  }

  @UseGuards(AuthGuard)
  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.removeAlbum(id);
  }

  @UseGuards(AuthGuard)
  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return await this.favoritesService.removeTrack(id);
  }
}
