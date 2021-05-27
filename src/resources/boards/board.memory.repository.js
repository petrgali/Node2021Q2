const DB = require('../../common/mockDB').boards;

const boardAPI = {
  getAll: async () => DB,

  getById: async (idx) => DB.find((board) => board.id === idx),

  addNewRecord: async (data) => DB.push(data),

  updateRecord: async (idx, data) => {
    const board = await boardAPI.getById(idx);
    if (board) Object.assign(board, data);
  },

  deleteRecord: async (idx) => {
    const index = DB.findIndex((record) => record.id === idx);
    DB.splice(index, 1);
  },
};

module.exports = { boardAPI };
