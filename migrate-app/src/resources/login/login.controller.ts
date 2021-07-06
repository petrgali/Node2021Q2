import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { UserCredentials } from './dto/login.dto';
import config from '../../common/configuration';

@Controller('login')
export class LoginController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async login(
    @Body() userCredentials: UserCredentials,
  ): Promise<{ token: string }> {
    const registered = await this.usersService.findByLogin(
      userCredentials.login,
    );
    if (!registered) throw new ForbiddenException('User not found');
    const match = await bcrypt.compare(
      userCredentials.password,
      registered.password,
    );
    if (!match) throw new UnauthorizedException('Wrong password');
    const token = jwt.sign(
      {
        userId: registered.id,
        login: registered.login,
      },
      String(config().secret),
      { expiresIn: 60 * 60 },
    );
    return { token: token };
  }
}
