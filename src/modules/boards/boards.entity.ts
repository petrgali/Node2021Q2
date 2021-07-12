import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { BoardColumn } from '../columns/columns.entity';

@Entity()
export class Board {
  @PrimaryColumn()
  id: string = uuid();

  @Column()
  title: string;

  @OneToMany(() => BoardColumn, (column: BoardColumn) => column.board)
  columns: BoardColumn[];
}
