import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { Board } from './boards.entity';
import { CreateBoardDTO } from './dto/create.board.dto';
import { BoardsService } from './boards.service';
import { AuthGuard } from '../../guards/auth.guard';
import { BoardNotFound } from './boardNotFound.exception';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Board> {
    const record = await this.boardsService.findOne(id);
    if (record) return record;
    throw new BoardNotFound(id);
  }

  @Post()
  async create(@Body() createBoard: CreateBoardDTO): Promise<Board> {
    return this.boardsService.create(createBoard);
  }

  @Put(':id')
  async update(
    @Body() updateBoard: CreateBoardDTO,
    @Param('id') id: string,
  ): Promise<Board> {
    const updated = await this.boardsService.update(id, updateBoard);
    if (updated) return updated;
    throw new BadRequestException();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.boardsService.delete(id);
  }
}
