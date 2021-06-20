import API from './task.memory.repository'
import Task from '../../entities/task.entity'
import { TaskDTO } from "../../common/types"
import { DeleteResult } from 'typeorm'

export const serviceAPI = {

  getBoardTasks: (idx: string | undefined): Promise<Task[]> =>
    API.getBoardTasks(idx),

  addBoardTask: (data: TaskDTO, id: string | undefined): Promise<Task | undefined> =>
    API.addBoardTask(data, id),

  getTaskById: (boardId: string | undefined, taskId: string | undefined): Promise<Task | undefined> =>
    API.getTaskById(boardId, taskId),

  updateTask: async (data: TaskDTO, boardId: string | undefined, taskId: string | undefined): Promise<Task | undefined> => {
    const update: TaskDTO = {
      ...data,
      boardId,
    }
    return API.updateTask(taskId, update)
  },

  deleteTask: (_boardId: string | undefined, taskId: string | undefined): Promise<DeleteResult> =>
    API.deleteTask(taskId)
}
