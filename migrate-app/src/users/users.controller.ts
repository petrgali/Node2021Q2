import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserDTO } from './dto/create.user.dto';
import { UsersService } from './users.service';
import { IUsers } from './interfaces/users.interface'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(): IUsers[] {
        return this.usersService.findAll()
    }

    @Post()
    create(@Body() createUser: UserDTO): Partial<UserDTO> {
        return UserDTO.toResponse(createUser)
    }

    @Get(':id')
    findOne(): Partial<UserDTO> {
        const user = new UserDTO()
        return UserDTO.toResponse(user)
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
