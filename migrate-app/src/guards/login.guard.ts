import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../resources/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { login, password } = request.body;
    return this.validateUser(login, password);
  }

  async validateUser(login: string, password: string): Promise<boolean> {
    const registered = await this.userService.findByLogin(login);
    if (!registered) throw new ForbiddenException('User not found');
    const match = await bcrypt.compare(password, registered.password);
    if (!match) throw new UnauthorizedException('Wrong password');
    return match;
  }
}
