import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create.task.dto';
import { Task } from './tasks.entity';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll(@Param('boardId') boardId: string): Promise<Task[]> {
    const tasksList = await this.taskService.findAll(boardId);
    if (tasksList) return tasksList;
    throw new NotFoundException('Tasks not found');
  }

  @Get(':id')
  async findOne(@Param() params: Partial<Task>): Promise<Task> {
    const task = await this.taskService.findOne(
      String(params.boardId),
      String(params.id),
    );
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

  @Put(':id')
  async update(
    @Body() updateTask: CreateTaskDTO,
    @Param() params: Partial<Task>,
  ): Promise<Task> {
    return this.taskService.update(
      updateTask,
      String(params.boardId),
      String(params.id),
    );
  }

  @Delete(':taskId')
  async delete(@Param('taskId') taskId: string): Promise<void> {
    await this.taskService.delete(taskId);
  }
}
