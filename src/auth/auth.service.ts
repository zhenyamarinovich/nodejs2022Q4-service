import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenDTO } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDTO: CreateUserDTO) {
    const user = await this.userService.getUserByLogin(userDTO.login);

    if (!user) {
      throw new ForbiddenException();
    }

    const isRightPassword = await bcrypt.compare(
      userDTO.password,
      user.password,
    );

    if (!isRightPassword) {
      throw new ForbiddenException();
    }
    return this.generateToken({ login: user.login, userId: user.id });
  }

  async registration(userDTO: CreateUserDTO) {
    const hashPassword = await bcrypt.hash(
      userDTO.password,
      Number(process.env.CRYPT_SALT),
    );

    const user = await this.userService.create({
      login: userDTO.login,
      password: hashPassword,
    });

    return user;
  }

  async refresh({ refreshToken }: RefreshTokenDTO) {
    try {
      const tokenData = this.jwtService.verify(refreshToken);

      const user = this.userService.getById(tokenData.userId);

      if (!user) {
        throw new ForbiddenException();
      }

      return this.generateToken({
        userId: tokenData.id,
        login: tokenData.login,
      });
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  async generateToken(payload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
      }),
    };
  }
}
