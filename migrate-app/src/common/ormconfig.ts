import { ConnectionOptions } from 'typeorm';
import { User } from '../resources/users/users.entity';
import { Board } from '../resources/boards/boards.entity';
import { Task } from '../resources/tasks/tasks.entity';
import { BoardColumn } from '../resources/columns/columns.entity';
import configuration from './configuration';

const conn = configuration();

const config: ConnectionOptions[] = [{
  type: 'postgres',
  host: conn.database.host,
  port: Number(conn.database.port),
  username: conn.database.username,
  password: conn.database.password,
  database: conn.database.database,
  entities: [User, Board, BoardColumn, Task],
  migrations: [__dirname + '/../migrations/database/*.ts'],
  cli: {
    migrationsDir: 'src/migrations/database',
  },
  synchronize: false,
  migrationsRun: false,
  name: 'database'
},
{
  type: 'postgres',
  host: conn.database.host,
  port: Number(conn.database.port),
  username: conn.database.username,
  password: conn.database.password,
  database: conn.database.database,
  entities: [User, Board, BoardColumn, Task],
  migrations: [__dirname + '/../migrations/seed/*.ts'],
  cli: {
    migrationsDir: 'src/migrations/seed',
  },
  synchronize: false,
  migrationsRun: false,
  name: 'seed'
}
];

export = config;
