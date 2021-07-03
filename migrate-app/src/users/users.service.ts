import { Injectable } from '@nestjs/common';
import { IUsers } from './interfaces/users.interface'
import User from './users.entity';

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
    };
    findOne(id: string): IUsers {
        return this.data.find(record => record.id === id)
    };
    createRecord(user: User): User {
        this.data.push(user)
        return user
    }

}
