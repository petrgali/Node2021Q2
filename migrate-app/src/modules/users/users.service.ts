import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from './dto/create.user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async findByLogin(login: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { login: login } });
  }

  async create(data: CreateUserDTO): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, data);
    return await this.userRepository.save(newUser);
  }

  async update(id: string, data: CreateUserDTO): Promise<User> {
    if (data.password) data.password = bcrypt.hashSync(data.password, 10);
    return (await this.userRepository.update(id, data)).raw;
  }

  async delete(idx: string): Promise<void> {
    await this.userRepository.delete(idx);
  }
}
