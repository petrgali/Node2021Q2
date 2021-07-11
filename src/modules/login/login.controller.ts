import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { UserCredentials } from './dto/login.dto';
import { LoginGuard } from '../../guards/login.guard';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(LoginGuard)
  @HttpCode(200)
  @Post()
  async login(
    @Body() userCredentials: UserCredentials,
  ): Promise<{ token: string }> {
    return await this.loginService.login(userCredentials);
  }
}
