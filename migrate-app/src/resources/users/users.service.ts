import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create.user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async create(data: CreateUserDTO): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, data);
    return this.userRepository.save(newUser);
  }

  async update(id: string, data: CreateUserDTO): Promise<User> {
    if (data.password) data.password = bcrypt.hashSync(data.password, 10);
    return (await this.userRepository.update(id, data)).raw;
  }

  async delete(idx: string): Promise<void> {
    await this.userRepository.delete(idx);
  }
}
