const DB = require('../../common/mockDB').tasks;

const getBoardTasks = async (idx) =>
  DB.filter((record) => record.boardId === idx);
const addBoardTask = async (task) => DB.push(task);
const getTaskById = async (params) => {
  const tasks = await getBoardTasks(params.board);
  const task = tasks.find((record) => record.id === params.task);
  return task;
};
const updateTask = async (params, data) => {
  const task = await getTaskById(params);
  if (task) Object.assign(task, data);
};
const deleteTask = async (params) => {
  const idx = DB.findIndex((task) => task.id === params.task);
  DB.splice(idx, 1);
};
const deleteBoardTasks = async (idx) => {
  const records = [];
  DB.map((task, id) => {
    if (task.boardId === idx) {
      records.push(id);
      return true;
    }
    return false;
  });
  records.map((id) => deleteTask(id));
};
const unassignTask = async (idx) => {
  DB.filter((task) =>
    task.userId === idx ? Object.assign(task, { userId: null }) : false
  );
};
module.exports = {
  getBoardTasks,
  addBoardTask,
  getTaskById,
  updateTask,
  deleteTask,
  unassignTask,
  deleteBoardTasks,
};
