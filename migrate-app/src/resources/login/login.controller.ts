import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserCredentials } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Controller('login')
export class LoginController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async login(@Body() userCredentials: UserCredentials): Promise<string> {
    const registered = await this.usersService.findByLogin(
      userCredentials.login,
    );
    if (!registered) throw new ForbiddenException('User no found');
    const match = await bcrypt.compare(
      userCredentials.password,
      registered.password,
    );
    if (!match) throw new UnauthorizedException('Wrong password');
    return 'ok';
  }
}
