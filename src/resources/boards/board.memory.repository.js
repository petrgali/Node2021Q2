const DB = require('../../common/mockDB').boards;

const getAll = async () => DB;
const getById = async (idx) => DB.find((board) => board.id === idx);
const addNewRecord = async (data) => DB.push(data);
const updateRecord = async (idx, data) => {
  const board = await getById(idx);
  if (board) Object.assign(board, data);
};
const deleteRecord = async (idx) => {
  const index = DB.findIndex((record) => record.id === idx);
  DB.splice(index, 1);
};

module.exports = { getAll, addNewRecord, getById, updateRecord, deleteRecord };
