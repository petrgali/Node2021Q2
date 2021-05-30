import { ITask, ITaskRaw } from "./task.model";
import API from './task.memory.repository';
import Task from './task.model';

export const serviceAPI = {
  getBoardTasks: (idx: string | undefined): Promise<Array<ITask>> => API.getBoardTasks(idx),
  addBoardTask: (data: ITaskRaw, id: string | undefined): ITask => {
    const task: ITask = new Task({
      title: data.title,
      order: data.order,
      description: data.description,
      userId: data.userId,
      boardId: id,
      columnId: data.columnId,
    });
    API.addBoardTask(task);
    return task;
  },
  getTaskById: (boardId: string | undefined, taskId: string | undefined): Promise<ITask | undefined> =>
    API.getTaskById(boardId, taskId),
  updateTask: (data: ITaskRaw, boardId: string | undefined, taskId: string | undefined): Promise<ITask | undefined> => {
    const update: ITaskRaw = {
      ...data
    };
    API.updateTask(boardId, taskId, update);
    return serviceAPI.getTaskById(boardId, taskId);
  },
  deleteTask: (_boardId: string | undefined, taskId: string | undefined): Promise<void> =>
    API.deleteTask(taskId)
};
