import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Board } from '../boards/boards.entity';

@Entity()
export class BoardColumn {
  @PrimaryColumn()
  id: string = uuid();

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board: Board) => board.id, { onDelete: 'CASCADE' })
  board: string;
}
