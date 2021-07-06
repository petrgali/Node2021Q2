import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<Partial<User>[]> {
    const usersList = await this.usersService.findAll();
    return usersList.map(User.toResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Partial<User>> {
    const user = await this.usersService.findOne(id);
    if (user) return User.toResponse(user);
    throw new NotFoundException('User not found');
  }

  @Post()
  async create(@Body() createUser: CreateUserDTO): Promise<Partial<User>> {
    const newUser = await this.usersService.create(createUser);
    return User.toResponse(newUser);
  }

  @Put(':id')
  async update(
    @Body() updateUser: CreateUserDTO,
    @Param('id') id: string,
  ): Promise<Partial<User>> {
    const updated = await this.usersService.update(id, updateUser);
    if (updated) return User.toResponse(updated);
    throw new BadRequestException('Bad request');
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
