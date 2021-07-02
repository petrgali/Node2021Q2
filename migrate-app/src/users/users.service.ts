import { Injectable } from '@nestjs/common';
import { IUsers } from './interfaces/users.interface'

@Injectable()
export class UsersService {
    private readonly data: IUsers[] = [
        {
            id: '213sdfa',
            name: 'John',
            login: 'Jj'
        }
    ];
    findAll(): IUsers[] {
        return this.data
    }

}
