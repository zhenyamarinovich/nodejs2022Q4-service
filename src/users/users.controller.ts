import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UsersController {
  @Get()
  getAll() {
    return 'all users';
  }

  @Get(':id')
  getById(@Param('id') id) {
    return 'user ' + id;
  }
}
