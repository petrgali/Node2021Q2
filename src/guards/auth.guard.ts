import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
import config from '../common/configuration';
import { Token } from '../common/types';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateJWT(request.headers.authorization);
  }

  async validateJWT(token: string): Promise<boolean> {
    if (!token) throw new UnauthorizedException('No token provided');

    const [method, key] = token.split(' ');

    if (method !== 'Bearer')
      throw new UnauthorizedException('Invalid token scheme');

    let decoded;

    if (key) {
      try {
        decoded = jwt.verify(key, String(config().secret));
      } catch (err) {
        throw new UnauthorizedException(err.message);
      }
    }
    if (decoded) {
      const { userId } = decoded as Token;
      const user = await this.userService.findOne(userId);
      return !!user;
    }
    throw new UnauthorizedException('No token provided');
  }
}
