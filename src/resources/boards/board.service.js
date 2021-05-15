const boardRepo = require('./board.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');
const Board = require('./board.model');
const Column = require('../columns/columns.model');

const getAll = () => boardRepo.getAll();
const getById = (idx) => boardRepo.getById(idx);
const addNewRecord = (data) => {
  const columns = data.columns.map(
    (item) =>
      new Column({
        title: item.title,
        order: item.order,
      })
  );
  const board = new Board({
    title: data.title,
    columns,
  });
  boardRepo.addNewRecord(board);
  return board;
};
const updateRecord = async (data) => {
  const board = await getById(data.params.id);
  const { columns } = board;
  const update = {
    title: data.body.title,
    columns,
  };
  await boardRepo.updateRecord(data.params.id, update);
  return getById(data.params.id);
};
const deleteRecord = async (idx) => {
  await taskRepo.deleteBoardTasks(idx);
  boardRepo.deleteRecord(idx);
};
module.exports = { getAll, addNewRecord, getById, updateRecord, deleteRecord };
