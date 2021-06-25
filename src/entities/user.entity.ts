import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity()
class User {

  @PrimaryColumn()
  id: string = uuid();

  @Column()
  name: string = 'default_name';

  @Column()
  login: string;

  @Column()
  password: string;
}

export default User