import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { UserCredentials } from './dto/login.dto';
import config from '../../common/configuration';
import { UsersService } from '../users/users.service';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}

  async login(userCredentials: UserCredentials): Promise<{ token: string }> {
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
