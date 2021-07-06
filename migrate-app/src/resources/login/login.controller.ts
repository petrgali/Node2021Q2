import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserCredentials } from './dto/login.dto';
import { LoginGuard } from './guard/login.guard';
import { LoginService } from './login.service'

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @UseGuards(LoginGuard)
  @Post()
  async login(
    @Body() userCredentials: UserCredentials,
  ): Promise<{ token: string }> {
    return await this.loginService.login(userCredentials)
  }
}
