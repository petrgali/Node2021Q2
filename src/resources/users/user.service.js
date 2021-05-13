const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = (idx) => usersRepo.getById(idx);
const addNewRecord = (data) => usersRepo.addNewRecord(data);
const updateRecord = (idx, data) => usersRepo.updateRecord(idx, data);
const deleteRecord = (idx) => usersRepo.deleteRecord(idx);

module.exports = { getAll, addNewRecord, getById, updateRecord, deleteRecord };
