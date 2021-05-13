const dummyData = [
  {
    id: '123',
    title: 'testBoard',
    columns: [
      {
        id: '222',
        title: 'testColumn',
        order: 0,
      },
    ],
  },
];

const getAll = async () => dummyData;
const getById = async (idx) => dummyData.find((board) => board.id === idx);
const addNewRecord = async (data) => dummyData.push(data);
const updateRecord = async (idx, data) => {
  const board = await getById(idx);
  if (board) Object.assign(board, data);
};
const deleteRecord = async (idx) => {
  const index = dummyData.findIndex((record) => record.id === idx);
  dummyData.splice(index, 1);
};
module.exports = { getAll, addNewRecord, getById, updateRecord, deleteRecord };
