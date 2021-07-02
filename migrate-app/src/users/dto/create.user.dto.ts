
import { v4 as uuid } from 'uuid'

export class UserDTO {
    readonly id: string = uuid();
    readonly name: string;
    readonly login: string
    readonly password: string

    static toResponse(user: UserDTO): Partial<UserDTO> {
        const { id, name, login } = user
        return { id, name, login }
    }
}