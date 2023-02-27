import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
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
    return this.generateToken(user);
  }

  async registration(userDTO: CreateUserDTO) {
    const userByEmail = await this.userService.getUserByLogin(userDTO.login);
    if (userByEmail) {
      throw new BadRequestException('User with the same login is exist');
    }

    const hashPassword = await bcrypt.hash(
      userDTO.password,
      Number(process.env.CRYPT_SALT),
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
