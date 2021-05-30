import { ITask, ITaskRaw } from './task.model';
const DB = require('../../common/mockDB').tasks;

const taskAPI = {
  getBoardTasks: async (idx: string | undefined): Promise<Array<ITask>> => DB.filter((record: ITask) => record.boardId === idx),
  addBoardTask: async (task: ITask): Promise<ITask> => DB.push(task),
  getTaskById: async (boardId: string | undefined, taskId: string | undefined): Promise<ITask | undefined> => {
    const tasks = await taskAPI.getBoardTasks(boardId);
    const task = tasks.find((record) => record.id === taskId);
    return task;
  },
  updateTask: async (boardId: string | undefined, taskId: string | undefined, data: ITaskRaw): Promise<void> => {
    const task = await taskAPI.getTaskById(boardId, taskId);
    if (task) Object.assign(task, data);
  },
  deleteTask: async (taskId: string | undefined): Promise<void> => {
    const idx: number = DB.findIndex((task: ITask) => task.id === taskId);
    DB.splice(idx, 1);
  },
  deleteBoardTasks: async (idx: string | undefined): Promise<void> => {
    const records: Array<string> = [];
    DB.map((task: ITask, id: string) => {
      if (task.boardId === idx) {
        records.push(id);
        return true;
      }
      return false;
    });
    records.map((id: string) => taskAPI.deleteTask(id));
  },
  unassignTask: async (idx: string | undefined): Promise<void> => {
    DB.filter((task: ITask) =>
      task.userId === idx ? Object.assign(task, { userId: null }) : false
    );
  },
};
export default taskAPI
