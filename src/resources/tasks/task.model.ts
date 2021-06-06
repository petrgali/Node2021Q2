import { v4 as uuid } from 'uuid'

export { ITask, ITaskRaw }

interface ITask {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
}
interface ITaskRaw {
  title?: string,
  order?: number,
  description?: string,
  userId?: string,
  boardId?: string,
  columnId?: string,
}

class Task {
  public id: string;
  public title: string;
  public order: number;
  public description: string;
  public userId: string;
  public boardId: string;
  public columnId: string
  constructor({
    id = uuid(),
    title = 'TEST_TASK',
    order = 0,
    description = 'TEST_DESC',
    userId = '',
    boardId = '',
    columnId = '',
  } = {}) {
    this.id = id
    this.title = title
    this.order = order
    this.description = description
    this.userId = userId
    this.boardId = boardId
    this.columnId = columnId
  }
  static toResponse(task: ITask): ITask {
    const { id, title, order, description, userId, boardId, columnId } = task
    return { id, title, order, description, userId, boardId, columnId }
  }
}
export default Task
