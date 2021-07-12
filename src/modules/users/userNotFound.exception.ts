import { NotFoundException } from '@nestjs/common';

export class UserNotFound extends NotFoundException {
  constructor(userId: string) {
    super(`User with id ${userId} not found`);
  }
}
