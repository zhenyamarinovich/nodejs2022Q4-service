import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDTO } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDTO: CreateUserDTO) {
    return this.authService.login(userDTO);
  }

  @Post('/signup')
  registration(@Body() userDTO: CreateUserDTO) {
    return this.authService.registration(userDTO);
  }

  @Post('/refresh')
  refresh(@Body() refreshToken: RefreshTokenDTO) {
    return this.authService.refresh(refreshToken);
  }
}
