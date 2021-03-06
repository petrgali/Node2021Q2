import dotenv from 'dotenv'
import path from 'path'
import { ConnectionOptions } from 'typeorm'

dotenv.config({
    path: path.join(__dirname, '../../.env')
})

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env['POSTGRES_HOST'],
    port: Number(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    entities: [__dirname + '/../entities/**/*.ts'],
    migrations: [__dirname + '/../migrations/*.ts'],
    cli: {
        migrationsDir: 'src/migrations'
    },
    synchronize: false,
    migrationsRun: true
}
export = config