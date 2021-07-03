import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Board } from './boards.entity';
import { CreateBoardDTO } from './dto/create.board.dto';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {

    constructor(private readonly boardsService: BoardsService) { }

    @Get()
    findAll(): Promise<Board[]> {
        return this.boardsService.findAll()
    };

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Board> {
        return this.boardsService.findOne(id)
    };

    @Post()
    create(@Body() createBoard: CreateBoardDTO): Promise<Board> {
        return this.boardsService.create(createBoard)
    };

    @Put(':id')
    update(@Body() updateBoard: CreateBoardDTO, @Param('id') id: string): Promise<Board> {
        return this.boardsService.update(id, updateBoard)
    };

    @Delete(':id')
    delete(@Param('id') id: string): Promise<DeleteResult> {
        return this.boardsService.delete(id)
    }

}
