import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [LoginController],
    providers: [UsersService],
})
export class LoginModule { }