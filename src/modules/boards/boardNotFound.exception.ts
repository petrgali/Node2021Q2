import { NotFoundException } from '@nestjs/common';

export class BoardNotFound extends NotFoundException {
  constructor(boardId: string) {
    super(`Board with id ${boardId} not found`);
  }
}
