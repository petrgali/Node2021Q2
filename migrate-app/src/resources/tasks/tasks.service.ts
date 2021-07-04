import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDTO } from './dto/create.task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async findAll(id: string): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { boardId: id } });
  }

  async findOne(boardId: string, taskId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(taskId);
    if (task && boardId !== 'undefined') {
      task.boardId = boardId;
    }
    return task;
  }

  async create(task: CreateTaskDTO, boardId: string): Promise<Task> {
    const newTask = new Task();
    Object.assign(newTask, task);
    newTask.boardId = boardId;
    await this.tasksRepository.save(newTask);
    return this.findOne(boardId, newTask.id);
  }

  async update(
    data: CreateTaskDTO,
    boardId: string,
    taskId: string,
  ): Promise<Task> {
    const update = { ...data, boardId };
    return (await this.tasksRepository.update(taskId, update)).raw;
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.tasksRepository.delete(id);
  }
}
