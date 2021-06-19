import API from './task.memory.repository'
import Task from '../../entities/task.entity'
import { TaskDTO } from "../../common/types"
import { DeleteResult } from 'typeorm'

export const serviceAPI = {

  getBoardTasks: (idx: string): Promise<Task[]> => API.getBoardTasks(idx),

  addBoardTask: (data: TaskDTO, id: string): Promise<Task | undefined> =>
    API.addBoardTask(data, id),

  getTaskById: (boardId: string, taskId: string): Promise<Task | undefined> =>
    API.getTaskById(boardId, taskId),

  updateTask: (data: TaskDTO, boardId: string, taskId: string): Promise<Task | undefined> => {
    const update: TaskDTO = {
      ...data,
      boardId,
    }
    return API.updateTask(taskId, update)
  },

  deleteTask: (_boardId: string, taskId: string): Promise<DeleteResult> =>
    API.deleteTask(taskId)
}
