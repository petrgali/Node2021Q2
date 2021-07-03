import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create.user.dto'

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    };

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Partial<User>> {
        const user = await this.usersService.findOne(id)
        return User.toResponse(user)
    }

    @Post()
    async create(@Body() createUser: CreateUserDTO): Promise<Partial<User>> {
        const newUser = await this.usersService.create(createUser)
        return User.toResponse(newUser)
    }

    @Put()
    updateUser(): string {
        return 'user updated'
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): string {
        return `user ${id} is deleted`
    }
}
