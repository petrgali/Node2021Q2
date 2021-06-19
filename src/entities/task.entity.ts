import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import Board from './board.entity'
import BoardColumn from './columns.entity'
import User from './user.entity'

@Entity()
class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    title: string

    @Column()
    order: number

    @Column()
    description: string

    @OneToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn()
    user: User | null

    @OneToOne(() => Board, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn()
    board: Board | null

    @OneToOne(() => BoardColumn, { nullable: true })
    @JoinColumn()
    column: BoardColumn | null

}

export default Task