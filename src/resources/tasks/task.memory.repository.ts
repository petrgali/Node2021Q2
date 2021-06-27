import { DeleteResult, getRepository } from 'typeorm'
import { TaskDTO } from '../../common/types'
import Task from '../../entities/task.entity'

const taskAPI = {

  getBoardTasks: async (idx: string | undefined): Promise<Task[]> =>
    await getRepository(Task).find({
      where: { boardId: idx }
    }),

  addBoardTask: async (task: TaskDTO, boardId: string | undefined): Promise<Task | undefined> => {
    const { title, order, description, columnId, userId } = task
    const newTask = getRepository(Task)
      .create({ title, order, description, columnId, userId, boardId })
    await getRepository(Task).save(newTask)
    return taskAPI.getTaskById(boardId, newTask.id)
  },

  getTaskById: async (boardId: string | undefined, taskId: string | undefined): Promise<Task | undefined> => {
    const task = await getRepository(Task).findOne(taskId)
    if (task && boardId !== 'undefined') {
      task.boardId = boardId
    }
    return task
  },

  updateTask: async (taskId: string | undefined, data: TaskDTO): Promise<Task | undefined> => {
    const { title, order, description, boardId } = data
    await getRepository(Task).update(String(taskId), { title, order, description, boardId })
    return await getRepository(Task).findOne(taskId)
  },

  deleteTask: async (taskId: string | undefined): Promise<DeleteResult> =>
    await getRepository(Task).delete(String(taskId))
}
export default taskAPI
