import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, Connection } from 'typeorm';
import { CreateBoardDTO } from './dto/create.board.dto';
import { Board } from './boards.entity';
import { BoardColumn } from '../columns/columns.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async findAll(): Promise<Board[]> {
    return this.boardRepository.find({ relations: ['columns'] });
  }

  async findOne(id: string): Promise<Board> {
    return this.boardRepository.findOne(id, { relations: ['columns'] });
  }

  async create(data: CreateBoardDTO): Promise<Board> {
    const newBoard = new Board();
    Object.assign(newBoard, data);
    await this.connection.manager.save(newBoard);

    for (const column of data.columns) {
      const newColumn = new BoardColumn();
      Object.assign(newColumn, column);
      newColumn.board = newBoard.id;
      await this.connection.manager.save(newColumn);
    }
    return this.boardRepository.findOne(newBoard.id, {
      relations: ['columns'],
    });
  }

  async update(id: string, data: CreateBoardDTO): Promise<Board> {
    return (await this.boardRepository.update(id, { title: data.title })).raw;
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.boardRepository.delete(id);
  }
}
