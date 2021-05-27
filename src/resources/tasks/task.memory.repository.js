const DB = require('../../common/mockDB').tasks;

const taskAPI = {
  getBoardTasks: async (idx) => DB.filter((record) => record.boardId === idx),

  addBoardTask: async (task) => DB.push(task),

  getTaskById: async (params) => {
    const tasks = await taskAPI.getBoardTasks(params.board);
    const task = tasks.find((record) => record.id === params.task);
    return task;
  },

  updateTask: async (params, data) => {
    const task = await taskAPI.getTaskById(params);
    if (task) Object.assign(task, data);
  },

  deleteTask: async (params) => {
    const idx = DB.findIndex((task) => task.id === params.task);
    DB.splice(idx, 1);
  },

  deleteBoardTasks: async (idx) => {
    const records = [];
    DB.map((task, id) => {
      if (task.boardId === idx) {
        records.push(id);
        return true;
      }
      return false;
    });
    records.map((id) => taskAPI.deleteTask(id));
  },

  unassignTask: async (idx) => {
    DB.filter((task) =>
      task.userId === idx ? Object.assign(task, { userId: null }) : false
    );
  },
};
module.exports = { taskAPI };
