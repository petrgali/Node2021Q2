import { DeleteResult, getRepository, getConnection } from 'typeorm'
import { TaskDTO } from '../../common/types'
import Task from '../../entities/task.entity'
import Board from '../../entities/board.entity'
import User from '../../entities/user.entity'
import BoardColumn from '../../entities/columns.entity'

const taskAPI = {

  getBoardTasks: async (idx: string): Promise<Task[]> => {
    const task = await getRepository(Task).find({
      where: { board: idx }
    })
    if (task) return task
    return []
  },

  addBoardTask: async (task: TaskDTO, boardId: string): Promise<Task | undefined> => {
    const board = await getRepository(Board).findOne(boardId)
    const user = await getRepository(User).findOne(task.userId)
    const column = await getRepository(BoardColumn).findOne(task.columnId)

    const connection = getConnection()

    const newTask = new Task()
    newTask.title = task.title
    newTask.order = task.order
    newTask.description = task.description
    newTask.board = board || null
    newTask.column = column || null
    newTask.user = user || null

    await connection.manager.save(newTask)
    return getRepository(Task).findOne(newTask.id, { relations: ['user', 'column', 'board'] })
  },

  getTaskById: async (boardId: string, taskId: string): Promise<Task | undefined> => {
    return getRepository(Task).findOne({
      where: [
        { board: boardId },
        { id: taskId }
      ]
    })
  },

  updateTask: async (taskId: string, data: TaskDTO): Promise<Task | undefined> => {
    const { title, order, description } = data
    await getRepository(Task).update(taskId, { title, order, description })
    return await getRepository(Task).findOne(taskId)
  },

  deleteTask: async (taskId: string): Promise<DeleteResult> =>
    getRepository(Task).delete(taskId)
}
export default taskAPI
