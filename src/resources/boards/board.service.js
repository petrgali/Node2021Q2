const API = require('./board.memory.repository').boardAPI
const { taskAPI } = require('../tasks/task.memory.repository');
const Board = require('./board.model');
const Column = require('../columns/columns.model');

const serviceAPI = {
  getAll: () => API.getAll(),

  getById: (idx) => API.getById(idx),

  addNewRecord: (data) => {
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
    API.addNewRecord(board);
    return board;
  },

  updateRecord: async (data) => {
    const board = await serviceAPI.getById(data.params.id);
    const { columns } = board;
    const update = {
      title: data.body.title,
      columns,
    };
    await API.updateRecord(data.params.id, update);
    return serviceAPI.getById(data.params.id);
  },

  deleteRecord: async (idx) => {
    await taskAPI.deleteBoardTasks(idx);
    API.deleteRecord(idx);
  },
};
module.exports = { serviceAPI };
