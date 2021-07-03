import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs'
import { CreateUserDTO } from './dto/create.user.dto'
import { User } from './users.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }


    async findAll(): Promise<User[]> {
        return this.userRepository.find()
    };

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne(id)
    };

    async create(data: CreateUserDTO): Promise<User> {
        const newUser = new User(data)
        return this.userRepository.save(newUser)
    };

    async delete(idx: string): Promise<void> {
        await this.userRepository.delete(idx)
    }
}
