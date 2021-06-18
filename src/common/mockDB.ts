import { UserDTO } from '../common/types'
import { IBoard } from '../resources/boards/board.model'
import { ITask } from '../resources/tasks/task.model'

export interface IDb {
  users: Array<UserDTO>;
  boards: Array<IBoard>;
  tasks: Array<ITask>;
}
const DB: IDb = {
  users: [],
  boards: [],
  tasks: [],
}
module.exports = DB
