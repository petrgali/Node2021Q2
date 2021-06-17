import dotenv from 'dotenv'
import path from 'path'
import { ConnectionOptions } from 'typeorm'

dotenv.config({
    path: path.join(__dirname, '../../.env')
})

export const config: ConnectionOptions = {
    type: 'postgres',
    name: 'dbConn',
    synchronize: true,
    host: process.env['POSTGRES_HOST'],
    port: Number(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB']
}