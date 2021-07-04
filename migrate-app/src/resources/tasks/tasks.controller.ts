import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create.task.dto';
import { Task } from './tasks.entity';
import { DeleteResult } from 'typeorm';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll(@Param('boardId') boardId: string): Promise<Task[]> {
    const tasksList = await this.taskService.findAll(boardId);
    if (tasksList) return tasksList;
    throw new NotFoundException('Tasks not found');
  }

  @Get(':taskId')
  async findOne(@Param() params): Promise<Task> {
    const task = await this.taskService.findOne(params.boardId, params.taskId);
    if (task) return task;
    throw new NotFoundException('Task not found');
  }

  @Post()
  async create(
    @Body() createTask: CreateTaskDTO,
    @Param('boardId') boardId: string,
  ): Promise<Task> {
    return this.taskService.create(createTask, boardId);
  }

  @Put(':taskId')
  async update(
    @Body() updateTask: CreateTaskDTO,
    @Param() params,
  ): Promise<Task> {
    return this.taskService.update(updateTask, params.boardId, params.taskId);
  }

  @Delete(':taskId')
  async delete(@Param('taskId') taskId: string): Promise<DeleteResult> {
    return this.taskService.delete(taskId);
  }
}
