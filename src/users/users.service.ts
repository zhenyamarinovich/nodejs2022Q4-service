import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

const USER_VERSION = 1;

@Injectable()
export class UsersService {
  private users = [];

  getAll() {
    return this.users;
  }

  getById(id) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  create(userDTO: CreateUserDTO) {
    const currentDate = Date.now();
    const user = new User(
      v4(),
      userDTO.login,
      userDTO.password,
      USER_VERSION,
      currentDate,
      currentDate,
    );

    this.users.push(user);

    return user;
  }

  update(id, userDTO: UpdateUserDTO) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    if (userDTO.oldPassword !== this.users[index].password) {
      throw new ForbiddenException();
    }

    const user = this.users[index];

    user.password = userDTO.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    return user;
  }

  remove(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const [user] = this.users.splice(index, 1);
      return user;
    }
    throw new NotFoundException();
  }
}
