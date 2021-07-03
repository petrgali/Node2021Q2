import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import User from './users.entity';
import { UsersService } from './users.service';
import { IUsers } from './interfaces/users.interface'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(): IUsers[] {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): IUsers {
        return this.usersService.findOne(id)
    }

    @Post()
    create(@Body() createUser: User): IUsers {
        const newUser = this.usersService.createRecord(new User(createUser))
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
