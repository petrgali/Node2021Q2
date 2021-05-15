const dummyData = [
  {
    id: null,
    title: '',
    order: 0,
    description: '',
    userId: null,
    boardId: null,
    columnId: null,
  },
];

const getBoardTasks = async (idx) =>
  dummyData.filter((record) => record.boardId === idx);

const addBoardTask = async (task) => dummyData.push(task);

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
  const idx = dummyData.findIndex((task) => task.id === params.task);
  dummyData.splice(idx, 1);
};
const deleteBoardTasks = async (idx) => {
  const records = [];
  dummyData.map((task, id) => {
    if (task.boardId === idx) {
      records.push(id);
      return true;
    }
    return false;
  });
  records.map((id) => deleteTask(id));
};
const unassignTask = async (idx) => {
  dummyData.filter((task) => {
    if (task.userId === idx) {
      Object.assign(task, { userId: null });
      return true;
    }
    return false;
  });
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
