import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import Board from './board.entity'

@Entity()
class BoardColumn {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    title: string

    @Column()
    order: number

    @ManyToOne(() => Board, (board: Board) => board.columns, { onDelete: "CASCADE", onUpdate: 'CASCADE' })
    board: Board
}

export default BoardColumn