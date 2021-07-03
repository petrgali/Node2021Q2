import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create.task.dto';
import { Task } from './tasks.entity'
import { DeleteResult } from 'typeorm';

@Controller('boards/:boardId/tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Get()
    findAll(@Param('boardId') boardId: string): Promise<Task[]> {
        return this.taskService.findAll(boardId)
    };

    @Get(':taskId')
    findOne(@Param() params): Promise<Task> {
        return this.taskService.findOne(params.boardId, params.taskId)
    };

    @Post()
    create(@Body() createTask: CreateTaskDTO, @Param('boardId') boardId: string): Promise<Task> {
        return this.taskService.create(createTask, boardId)
    };

    @Put(':taskId')
    update(@Body() updateTask: CreateTaskDTO, @Param() params): Promise<Task> {
        return this.taskService.update(updateTask, params.boardId, params.taskId)
    };

    @Delete(':taskId')
    delete(@Param('id') id: string): Promise<DeleteResult> {
        return this.taskService.delete(id)
    }
}
