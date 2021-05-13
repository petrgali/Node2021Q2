const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();
const getById = (idx) => boardRepo.getById(idx);
const addNewRecord = (data) => boardRepo.addNewRecord(data);
const updateRecord = (idx, data) => boardRepo.updateRecord(idx, data);
const deleteRecord = (idx) => boardRepo.deleteRecord(idx);
module.exports = { getAll, addNewRecord, getById, updateRecord, deleteRecord };
