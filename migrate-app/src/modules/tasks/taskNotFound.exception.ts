import { NotFoundException } from '@nestjs/common';

class TaskNotFound extends NotFoundException {
  constructor(taskId: string) {
    super(`Task with id ${taskId} not found`);
  }
}

class BoardTasksNotFound extends NotFoundException {
  constructor(boardId: string) {
    super(`Board id ${boardId} tasks not found`);
  }
}

export { TaskNotFound, BoardTasksNotFound };
