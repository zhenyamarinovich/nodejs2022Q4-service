import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  async create(userDTO: CreateUserDTO) {
    const user = new User(userDTO.login, userDTO.password);

    await this.userRepository.insert(user);

    return user;
  }

  async update(id, userDTO: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    if (userDTO.oldPassword !== user.password) {
      throw new ForbiddenException();
    }

    await this.userRepository.update(id, { password: userDTO.newPassword });

    return await this.userRepository.findOneBy({ id });
  }

  async remove(id) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }

    await this.userRepository.delete(id);
  }
}
