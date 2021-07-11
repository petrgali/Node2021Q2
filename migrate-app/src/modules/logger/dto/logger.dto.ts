import { User } from '../../users/users.entity';

export interface LoggerDTO {
  ip: string;
  currentDate: Date;
  method: string;
  url: string;
  params: string;
  body: User;
  status: string;
  start: [number, number];
}
