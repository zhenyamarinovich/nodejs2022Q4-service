import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDTO: CreateUserDTO) {}

  async registration(userDTO: CreateUserDTO) {
    const hashPassword = await bcrypt.hash(
      userDTO.password,
      +process.env.CRYPT_SALT,
    );

    const user = await this.userService.create({
      login: userDTO.login,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async generateToken(user) {
    const payload = { userId: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
