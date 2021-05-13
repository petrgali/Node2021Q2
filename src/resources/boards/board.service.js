const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();
const addNewRecord = (data) => boardRepo.addNewRecord(data);

module.exports = { getAll, addNewRecord };
