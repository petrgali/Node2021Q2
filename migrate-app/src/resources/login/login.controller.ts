import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { UserCredentials } from './dto/login.dto';
import { LoginGuard } from './guard/login.guard';
import config from '../../common/configuration';

@Controller('login')
export class LoginController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(LoginGuard)
  @Post()
  async login(
    @Body() userCredentials: UserCredentials,
  ): Promise<{ token: string }> {
    const registered = await this.usersService.findByLogin(
      userCredentials.login,
    );
    const token = jwt.sign(
      {
        userId: String(registered?.id),
        login: userCredentials.login,
      },
      String(config().secret),
      { expiresIn: 60 * 60 },
    );
    return { token: token };
  }
}
