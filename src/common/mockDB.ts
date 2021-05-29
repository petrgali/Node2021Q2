import { IUser } from '../resources/users/user.model';
import { IBoard } from '../resources/boards/board.model';
import { ITask } from '../resources/tasks/task.model'

export interface IDb {
  users: Array<IUser>;
  boards: Array<IBoard>;
  tasks: Array<ITask>;
}
const DB: IDb = {
  users: [],
  boards: [],
  tasks: [],
};

module.exports = DB;
