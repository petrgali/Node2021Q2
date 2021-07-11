import { ConnectionOptions } from 'typeorm';
import { User } from '../modules/users/users.entity';
import { Board } from '../modules/boards/boards.entity';
import { Task } from '../modules/tasks/tasks.entity';
import { BoardColumn } from '../modules/columns/columns.entity';
import configuration from './configuration';

const conn = configuration();

const config: ConnectionOptions[] = [
  {
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
    name: 'database',
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
    name: 'seed',
  },
];

export = config;
