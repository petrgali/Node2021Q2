const DB = require('../../common/mockDB').users;

const getAll = async () => DB;
const addNewRecord = async (user) => DB.push(user);
const getById = async (idx) => DB.find((user) => user.id === idx);
const updateRecord = async (idx, data) => {
  const user = await getById(idx);
  if (user) Object.assign(user, data);
};
const deleteRecord = async (idx) => {
  const index = DB.findIndex((record) => record.id === idx);
  DB.splice(index, 1);
};

module.exports = { getAll, addNewRecord, getById, updateRecord, deleteRecord };
