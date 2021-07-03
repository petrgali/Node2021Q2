import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Board } from '../boards/boards.entity'
import { BoardColumn } from '../columns/columns.entity'
import { User } from '../users/users.entity'

@Entity()
export class Task {

    @PrimaryColumn()
    id: string = uuid()

    @Column()
    title: string

    @Column()
    order: number

    @Column()
    description: string

    @ManyToOne(() => User, (user: User) => user.id, { onDelete: 'SET NULL', nullable: true, eager: true })
    userId?: string

    @ManyToOne(() => Board, (board: Board) => board.id, { onDelete: 'CASCADE' })
    boardId?: string

    @ManyToOne(() => BoardColumn, (column: BoardColumn) => column.id, { eager: true })
    columnId?: string


}